var app = (function () {
	'use strict';

	function noop() {}

	function assign(tar, src) {
		for (const k in src) tar[k] = src[k];
		return tar;
	}

	function add_location(element, file, line, column, char) {
		element.__svelte_meta = {
			loc: { file, line, column, char }
		};
	}

	function run(fn) {
		return fn();
	}

	function blank_object() {
		return Object.create(null);
	}

	function run_all(fns) {
		fns.forEach(run);
	}

	function is_function(thing) {
		return typeof thing === 'function';
	}

	function safe_not_equal(a, b) {
		return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
	}

	function create_slot(definition, ctx, fn) {
		if (definition) {
			const slot_ctx = get_slot_context(definition, ctx, fn);
			return definition[0](slot_ctx);
		}
	}

	function get_slot_context(definition, ctx, fn) {
		return definition[1]
			? assign({}, assign(ctx.$$scope.ctx, definition[1](fn ? fn(ctx) : {})))
			: ctx.$$scope.ctx;
	}

	function get_slot_changes(definition, ctx, changed, fn) {
		return definition[1]
			? assign({}, assign(ctx.$$scope.changed || {}, definition[1](fn ? fn(changed) : {})))
			: ctx.$$scope.changed || {};
	}

	function exclude_internal_props(props) {
		const result = {};
		for (const k in props) if (k[0] !== '$') result[k] = props[k];
		return result;
	}

	function append(target, node) {
		target.appendChild(node);
	}

	function insert(target, node, anchor) {
		target.insertBefore(node, anchor || null);
	}

	function detach(node) {
		node.parentNode.removeChild(node);
	}

	function element(name) {
		return document.createElement(name);
	}

	function text(data) {
		return document.createTextNode(data);
	}

	function space() {
		return text(' ');
	}

	function listen(node, event, handler, options) {
		node.addEventListener(event, handler, options);
		return () => node.removeEventListener(event, handler, options);
	}

	function attr(node, attribute, value) {
		if (value == null) node.removeAttribute(attribute);
		else node.setAttribute(attribute, value);
	}

	function set_attributes(node, attributes) {
		for (const key in attributes) {
			if (key === 'style') {
				node.style.cssText = attributes[key];
			} else if (key in node) {
				node[key] = attributes[key];
			} else {
				attr(node, key, attributes[key]);
			}
		}
	}

	function children(element) {
		return Array.from(element.childNodes);
	}

	let current_component;

	function set_current_component(component) {
		current_component = component;
	}

	// TODO figure out if we still want to support
	// shorthand events, or if we want to implement
	// a real bubbling mechanism
	function bubble(component, event) {
		const callbacks = component.$$.callbacks[event.type];

		if (callbacks) {
			callbacks.slice().forEach(fn => fn(event));
		}
	}

	const dirty_components = [];

	const resolved_promise = Promise.resolve();
	let update_scheduled = false;
	const binding_callbacks = [];
	const render_callbacks = [];
	const flush_callbacks = [];

	function schedule_update() {
		if (!update_scheduled) {
			update_scheduled = true;
			resolved_promise.then(flush);
		}
	}

	function add_binding_callback(fn) {
		binding_callbacks.push(fn);
	}

	function add_render_callback(fn) {
		render_callbacks.push(fn);
	}

	function add_flush_callback(fn) {
		flush_callbacks.push(fn);
	}

	function flush() {
		const seen_callbacks = new Set();

		do {
			// first, call beforeUpdate functions
			// and update components
			while (dirty_components.length) {
				const component = dirty_components.shift();
				set_current_component(component);
				update(component.$$);
			}

			while (binding_callbacks.length) binding_callbacks.shift()();

			// then, once components are updated, call
			// afterUpdate functions. This may cause
			// subsequent updates...
			while (render_callbacks.length) {
				const callback = render_callbacks.pop();
				if (!seen_callbacks.has(callback)) {
					callback();

					// ...so guard against infinite loops
					seen_callbacks.add(callback);
				}
			}
		} while (dirty_components.length);

		while (flush_callbacks.length) {
			flush_callbacks.pop()();
		}

		update_scheduled = false;
	}

	function update($$) {
		if ($$.fragment) {
			$$.update($$.dirty);
			run_all($$.before_render);
			$$.fragment.p($$.dirty, $$.ctx);
			$$.dirty = null;

			$$.after_render.forEach(add_render_callback);
		}
	}

	function get_spread_update(levels, updates) {
		const update = {};

		const to_null_out = {};
		const accounted_for = { $$scope: 1 };

		let i = levels.length;
		while (i--) {
			const o = levels[i];
			const n = updates[i];

			if (n) {
				for (const key in o) {
					if (!(key in n)) to_null_out[key] = 1;
				}

				for (const key in n) {
					if (!accounted_for[key]) {
						update[key] = n[key];
						accounted_for[key] = 1;
					}
				}

				levels[i] = n;
			} else {
				for (const key in o) {
					accounted_for[key] = 1;
				}
			}
		}

		for (const key in to_null_out) {
			if (!(key in update)) update[key] = undefined;
		}

		return update;
	}

	function bind(component, name, callback) {
		if (component.$$.props.indexOf(name) === -1) return;
		component.$$.bound[name] = callback;
		callback(component.$$.ctx[name]);
	}

	function mount_component(component, target, anchor) {
		const { fragment, on_mount, on_destroy, after_render } = component.$$;

		fragment.m(target, anchor);

		// onMount happens after the initial afterUpdate. Because
		// afterUpdate callbacks happen in reverse order (inner first)
		// we schedule onMount callbacks before afterUpdate callbacks
		add_render_callback(() => {
			const new_on_destroy = on_mount.map(run).filter(is_function);
			if (on_destroy) {
				on_destroy.push(...new_on_destroy);
			} else {
				// Edge case - component was destroyed immediately,
				// most likely as a result of a binding initialising
				run_all(new_on_destroy);
			}
			component.$$.on_mount = [];
		});

		after_render.forEach(add_render_callback);
	}

	function destroy(component, detaching) {
		if (component.$$) {
			run_all(component.$$.on_destroy);
			component.$$.fragment.d(detaching);

			// TODO null out other refs, including component.$$ (but need to
			// preserve final state?)
			component.$$.on_destroy = component.$$.fragment = null;
			component.$$.ctx = {};
		}
	}

	function make_dirty(component, key) {
		if (!component.$$.dirty) {
			dirty_components.push(component);
			schedule_update();
			component.$$.dirty = blank_object();
		}
		component.$$.dirty[key] = true;
	}

	function init(component, options, instance, create_fragment, not_equal$$1, prop_names) {
		const parent_component = current_component;
		set_current_component(component);

		const props = options.props || {};

		const $$ = component.$$ = {
			fragment: null,
			ctx: null,

			// state
			props: prop_names,
			update: noop,
			not_equal: not_equal$$1,
			bound: blank_object(),

			// lifecycle
			on_mount: [],
			on_destroy: [],
			before_render: [],
			after_render: [],
			context: new Map(parent_component ? parent_component.$$.context : []),

			// everything else
			callbacks: blank_object(),
			dirty: null
		};

		let ready = false;

		$$.ctx = instance
			? instance(component, props, (key, value) => {
				if ($$.ctx && not_equal$$1($$.ctx[key], $$.ctx[key] = value)) {
					if ($$.bound[key]) $$.bound[key](value);
					if (ready) make_dirty(component, key);
				}
			})
			: props;

		$$.update();
		ready = true;
		run_all($$.before_render);
		$$.fragment = create_fragment($$.ctx);

		if (options.target) {
			if (options.hydrate) {
				$$.fragment.l(children(options.target));
			} else {
				$$.fragment.c();
			}

			if (options.intro && component.$$.fragment.i) component.$$.fragment.i();
			mount_component(component, options.target, options.anchor);
			flush();
		}

		set_current_component(parent_component);
	}

	class SvelteComponent {
		$destroy() {
			destroy(this, true);
			this.$destroy = noop;
		}

		$on(type, callback) {
			const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
			callbacks.push(callback);

			return () => {
				const index = callbacks.indexOf(callback);
				if (index !== -1) callbacks.splice(index, 1);
			};
		}

		$set() {
			// overridden by instance, if it has props
		}
	}

	class SvelteComponentDev extends SvelteComponent {
		constructor(options) {
			if (!options || (!options.target && !options.$$inline)) {
				throw new Error(`'target' is a required option`);
			}

			super();
		}

		$destroy() {
			super.$destroy();
			this.$destroy = () => {
				console.warn(`Component was already destroyed`); // eslint-disable-line no-console
			};
		}
	}

	function subscribe(node, listeners) {
	  let subscriptions = listen$1(node, listeners);

	  return {
	    update(listeners) {
	      unsubscribe(subscriptions);
	      subscriptions = listen$1(node, listeners);
	    },
	    destroy() {
	      unsubscribe(subscriptions);
	    }
	  };
	}

	function listen$1(node, listeners) {
	  if (!listeners) return [];

	  return Object.keys(listeners).map(event => {
	    const handler = listeners[event];

	    node.addEventListener(event, handler);
	    return () => node.removeEventListener(event, handler);
	  });
	}

	function unsubscribe(subscriptions) {
	  return subscriptions.forEach(unsubscribe => unsubscribe());
	}

	/* src\a.svelte generated by Svelte v3.3.0 */

	function create_fragment(ctx) {
		var a, subscribe_action, current, dispose;

		const default_slot_1 = ctx.$$slots.default;
		const default_slot = create_slot(default_slot_1, ctx, null);

		var a_levels = [
			{ href: ctx.href },
			ctx.$$props
		];

		var a_data = {};
		for (var i = 0; i < a_levels.length; i += 1) {
			a_data = assign(a_data, a_levels[i]);
		}

		return {
			c() {
				a = element("a");

				if (default_slot) default_slot.c();

				set_attributes(a, a_data);

				dispose = [
					listen(a, "focus", ctx.focus_handler),
					listen(a, "blur", ctx.blur_handler),
					listen(a, "keypress", ctx.keypress_handler),
					listen(a, "click", ctx.click_handler)
				];
			},

			l(nodes) {
				if (default_slot) default_slot.l(a_nodes);
			},

			m(target, anchor) {
				insert(target, a, anchor);

				if (default_slot) {
					default_slot.m(a, null);
				}

				add_binding_callback(() => ctx.a_binding(a, null));
				subscribe_action = subscribe.call(null, a, ctx.listen) || {};
				current = true;
			},

			p(changed, ctx) {
				if (default_slot && default_slot.p && changed.$$scope) {
					default_slot.p(get_slot_changes(default_slot_1, ctx, changed, null), get_slot_context(default_slot_1, ctx, null));
				}

				if (changed.items) {
					ctx.a_binding(null, a);
					ctx.a_binding(a, null);
				}

				set_attributes(a, get_spread_update(a_levels, [
					(changed.href) && { href: ctx.href },
					(changed.$$props) && ctx.$$props
				]));

				if (typeof subscribe_action.update === 'function' && changed.listen) {
					subscribe_action.update.call(null, ctx.listen);
				}
			},

			i(local) {
				if (current) return;
				if (default_slot && default_slot.i) default_slot.i(local);
				current = true;
			},

			o(local) {
				if (default_slot && default_slot.o) default_slot.o(local);
				current = false;
			},

			d(detaching) {
				if (detaching) {
					detach(a);
				}

				if (default_slot) default_slot.d(detaching);
				ctx.a_binding(null, a);
				if (subscribe_action && typeof subscribe_action.destroy === 'function') subscribe_action.destroy();
				run_all(dispose);
			}
		};
	}

	function instance($$self, $$props, $$invalidate) {
		let { href, el, listen } = $$props;

		let { $$slots = {}, $$scope } = $$props;

		function focus_handler(event) {
			bubble($$self, event);
		}

		function blur_handler(event) {
			bubble($$self, event);
		}

		function keypress_handler(event) {
			bubble($$self, event);
		}

		function click_handler(event) {
			bubble($$self, event);
		}

		function a_binding($$node, check) {
			el = $$node;
			$$invalidate('el', el);
		}

		$$self.$set = $$new_props => {
			$$invalidate('$$props', $$props = assign(assign({}, $$props), $$new_props));
			if ('href' in $$props) $$invalidate('href', href = $$props.href);
			if ('el' in $$props) $$invalidate('el', el = $$props.el);
			if ('listen' in $$props) $$invalidate('listen', listen = $$props.listen);
			if ('$$scope' in $$new_props) $$invalidate('$$scope', $$scope = $$new_props.$$scope);
		};

		return {
			href,
			el,
			listen,
			focus_handler,
			blur_handler,
			keypress_handler,
			click_handler,
			$$props,
			a_binding,
			$$props: $$props = exclude_internal_props($$props),
			$$slots,
			$$scope
		};
	}

	class A extends SvelteComponent {
		constructor(options) {
			super();
			init(this, options, instance, create_fragment, safe_not_equal, ["href", "el", "listen"]);
		}
	}

	/* src\input.svelte generated by Svelte v3.3.0 */

	function create_fragment$N(ctx) {
		var input, subscribe_action, dispose;

		var input_levels = [
			ctx.$$props
		];

		var input_data = {};
		for (var i = 0; i < input_levels.length; i += 1) {
			input_data = assign(input_data, input_levels[i]);
		}

		return {
			c() {
				input = element("input");
				set_attributes(input, input_data);

				dispose = [
					listen(input, "focus", ctx.focus_handler),
					listen(input, "blur", ctx.blur_handler),
					listen(input, "keypress", ctx.keypress_handler),
					listen(input, "click", ctx.click_handler)
				];
			},

			m(target, anchor) {
				insert(target, input, anchor);
				add_binding_callback(() => ctx.input_binding(input, null));
				subscribe_action = subscribe.call(null, input, ctx.listen) || {};
			},

			p(changed, ctx) {
				if (changed.items) {
					ctx.input_binding(null, input);
					ctx.input_binding(input, null);
				}

				set_attributes(input, get_spread_update(input_levels, [
					(changed.$$props) && ctx.$$props
				]));

				if (typeof subscribe_action.update === 'function' && changed.listen) {
					subscribe_action.update.call(null, ctx.listen);
				}
			},

			i: noop,
			o: noop,

			d(detaching) {
				if (detaching) {
					detach(input);
				}

				ctx.input_binding(null, input);
				if (subscribe_action && typeof subscribe_action.destroy === 'function') subscribe_action.destroy();
				run_all(dispose);
			}
		};
	}

	function instance$N($$self, $$props, $$invalidate) {
		let { el, listen } = $$props;

		function focus_handler(event) {
			bubble($$self, event);
		}

		function blur_handler(event) {
			bubble($$self, event);
		}

		function keypress_handler(event) {
			bubble($$self, event);
		}

		function click_handler(event) {
			bubble($$self, event);
		}

		function input_binding($$node, check) {
			el = $$node;
			$$invalidate('el', el);
		}

		$$self.$set = $$new_props => {
			$$invalidate('$$props', $$props = assign(assign({}, $$props), $$new_props));
			if ('el' in $$props) $$invalidate('el', el = $$props.el);
			if ('listen' in $$props) $$invalidate('listen', listen = $$props.listen);
		};

		return {
			el,
			listen,
			focus_handler,
			blur_handler,
			keypress_handler,
			click_handler,
			$$props,
			input_binding,
			$$props: $$props = exclude_internal_props($$props)
		};
	}

	class Input extends SvelteComponent {
		constructor(options) {
			super();
			init(this, options, instance$N, create_fragment$N, safe_not_equal, ["el", "listen"]);
		}
	}
	//# sourceMappingURL=svelte-elements.es.js.map

	/* src\App.svelte generated by Svelte v3.3.0 */

	const file = "src\\App.svelte";

	// (13:0) <A bind:el href="#" on:click|preventDefault={() => clicked = true}>
	function create_default_slot(ctx) {
		var t;

		return {
			c: function create() {
				t = text("Howdy!");
			},

			m: function mount(target, anchor) {
				insert(target, t, anchor);
			},

			d: function destroy(detaching) {
				if (detaching) {
					detach(t);
				}
			}
		};
	}

	function create_fragment$1(ctx) {
		var h20, t1, updating_el, t2, h30, t4, label0, input0, t5, br0, t6, label1, input1, t7, t8, h21, t10, t11, h31, t13, label2, input3, t14, br1, t15, label3, input4, t16, current, dispose;

		function a_el_binding(value) {
			ctx.a_el_binding.call(null, value);
			updating_el = true;
			add_flush_callback(() => updating_el = false);
		}

		let a_props = {
			href: "#",
			$$slots: { default: [create_default_slot] },
			$$scope: { ctx }
		};
		if (ctx.el !== void 0) {
			a_props.el = ctx.el;
		}
		var a = new A({ props: a_props, $$inline: true });

		add_binding_callback(() => bind(a, 'el', a_el_binding));
		a.$on("click", ctx.click_handler);

		var input2 = new Input({
			props: { type: "text", listen: { keydown: ctx.func} },
			$$inline: true
		});
		input2.$on("focus", ctx.focus_handler);

		return {
			c: function create() {
				h20 = element("h2");
				h20.textContent = "A";
				t1 = space();
				a.$$.fragment.c();
				t2 = space();
				h30 = element("h3");
				h30.textContent = "Results";
				t4 = space();
				label0 = element("label");
				input0 = element("input");
				t5 = text(" Click");
				br0 = element("br");
				t6 = space();
				label1 = element("label");
				input1 = element("input");
				t7 = text(" Element");
				t8 = space();
				h21 = element("h2");
				h21.textContent = "Input";
				t10 = space();
				input2.$$.fragment.c();
				t11 = space();
				h31 = element("h3");
				h31.textContent = "Results";
				t13 = space();
				label2 = element("label");
				input3 = element("input");
				t14 = text(" Focus");
				br1 = element("br");
				t15 = space();
				label3 = element("label");
				input4 = element("input");
				t16 = text(" listen");
				add_location(h20, file, 11, 0, 189);
				add_location(h30, file, 14, 0, 279);
				attr(input0, "type", "checkbox");
				input0.disabled = true;
				add_location(input0, file, 15, 7, 303);
				add_location(label0, file, 15, 0, 296);
				add_location(br0, file, 15, 78, 374);
				attr(input1, "type", "checkbox");
				input1.disabled = true;
				add_location(input1, file, 16, 7, 386);
				add_location(label1, file, 16, 0, 379);
				add_location(h21, file, 18, 0, 461);
				add_location(h31, file, 21, 0, 573);
				attr(input3, "type", "checkbox");
				input3.disabled = true;
				add_location(input3, file, 22, 7, 597);
				add_location(label2, file, 22, 0, 590);
				add_location(br1, file, 22, 78, 668);
				attr(input4, "type", "checkbox");
				input4.disabled = true;
				add_location(input4, file, 23, 7, 680);
				add_location(label3, file, 23, 0, 673);

				dispose = [
					listen(input0, "change", ctx.input0_change_handler),
					listen(input1, "change", ctx.input1_change_handler),
					listen(input3, "change", ctx.input3_change_handler),
					listen(input4, "change", ctx.input4_change_handler)
				];
			},

			l: function claim(nodes) {
				throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
			},

			m: function mount(target, anchor) {
				insert(target, h20, anchor);
				insert(target, t1, anchor);
				mount_component(a, target, anchor);
				insert(target, t2, anchor);
				insert(target, h30, anchor);
				insert(target, t4, anchor);
				insert(target, label0, anchor);
				append(label0, input0);

				input0.checked = ctx.clicked;

				append(label0, t5);
				insert(target, br0, anchor);
				insert(target, t6, anchor);
				insert(target, label1, anchor);
				append(label1, input1);

				input1.checked = ctx.correct;

				append(label1, t7);
				insert(target, t8, anchor);
				insert(target, h21, anchor);
				insert(target, t10, anchor);
				mount_component(input2, target, anchor);
				insert(target, t11, anchor);
				insert(target, h31, anchor);
				insert(target, t13, anchor);
				insert(target, label2, anchor);
				append(label2, input3);

				input3.checked = ctx.focused;

				append(label2, t14);
				insert(target, br1, anchor);
				insert(target, t15, anchor);
				insert(target, label3, anchor);
				append(label3, input4);

				input4.checked = ctx.keydown;

				append(label3, t16);
				current = true;
			},

			p: function update(changed, ctx) {
				var a_changes = {};
				if (changed.$$scope) a_changes.$$scope = { changed, ctx };
				if (!updating_el && changed.el) {
					a_changes.el = ctx.el;
				}
				a.$set(a_changes);

				if (changed.clicked) input0.checked = ctx.clicked;
				if (changed.correct) input1.checked = ctx.correct;
				if (changed.focused) input3.checked = ctx.focused;
				if (changed.keydown) input4.checked = ctx.keydown;
			},

			i: function intro(local) {
				if (current) return;
				a.$$.fragment.i(local);

				input2.$$.fragment.i(local);

				current = true;
			},

			o: function outro(local) {
				a.$$.fragment.o(local);
				input2.$$.fragment.o(local);
				current = false;
			},

			d: function destroy(detaching) {
				if (detaching) {
					detach(h20);
					detach(t1);
				}

				a.$destroy(detaching);

				if (detaching) {
					detach(t2);
					detach(h30);
					detach(t4);
					detach(label0);
					detach(br0);
					detach(t6);
					detach(label1);
					detach(t8);
					detach(h21);
					detach(t10);
				}

				input2.$destroy(detaching);

				if (detaching) {
					detach(t11);
					detach(h31);
					detach(t13);
					detach(label2);
					detach(br1);
					detach(t15);
					detach(label3);
				}

				run_all(dispose);
			}
		};
	}

	function instance$1($$self, $$props, $$invalidate) {
		let clicked = false;
	  let focused = false;
	  let keydown = false;
	  let el, correct;

		function a_el_binding(value) {
			el = value;
			$$invalidate('el', el);
		}

		function click_handler() {
			const $$result = clicked = true;
			$$invalidate('clicked', clicked);
			return $$result;
		}

		function input0_change_handler() {
			clicked = this.checked;
			$$invalidate('clicked', clicked);
		}

		function input1_change_handler() {
			correct = this.checked;
			$$invalidate('correct', correct), $$invalidate('el', el);
		}

		function func() {
			const $$result = keydown = true;
			$$invalidate('keydown', keydown);
			return $$result;
		}

		function focus_handler() {
			const $$result = focused = true;
			$$invalidate('focused', focused);
			return $$result;
		}

		function input3_change_handler() {
			focused = this.checked;
			$$invalidate('focused', focused);
		}

		function input4_change_handler() {
			keydown = this.checked;
			$$invalidate('keydown', keydown);
		}

		$$self.$$.update = ($$dirty = { el: 1 }) => {
			if ($$dirty.el) { $$invalidate('correct', correct = el instanceof HTMLElement); }
		};

		return {
			clicked,
			focused,
			keydown,
			el,
			correct,
			a_el_binding,
			click_handler,
			input0_change_handler,
			input1_change_handler,
			func,
			focus_handler,
			input3_change_handler,
			input4_change_handler
		};
	}

	class App extends SvelteComponentDev {
		constructor(options) {
			super(options);
			init(this, options, instance$1, create_fragment$1, safe_not_equal, []);
		}
	}

	const app = new App({ target: document.body });

	return app;

}());
//# sourceMappingURL=bundle.js.map
