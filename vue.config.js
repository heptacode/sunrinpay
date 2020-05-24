module.exports = {
	css: {
		loaderOptions: {
			scss: {
				prependData: `@import "@/variable.scss";`,
			},
		},
	},
};
