export default {
	name: 'TabGroup',
	model: {
		prop: 'selectedTab',
		event: 'focus'
	},
	props: {
		selectedTab: {
			type: Number,
			default: 0
		}
	},
	watch: {
		selectedTab(index) {
			const selectedTab = this.$titaniumView.tabs[index];
			this.$titaniumView.activeTab = selectedTab;
		}
	},
	provide: function () {
		return {
			getTabGroup: this.getTabGroup
		};
	},
	render(h) {
		const self = this;
		return h('titanium-tab-group', {
			on: {
				focus: function (event) {
					self.$emit('focus', event.index);
				}
			}
		}, this.$slots.default);
	},
	mounted() {
		const selectedTab = this.$titaniumView.tabs[this.selectedTab];
		this.$titaniumView.activeTab = selectedTab;
	},
	methods: {
		getTabGroup() {
			return this.$titaniumView;
		}
	}
};
