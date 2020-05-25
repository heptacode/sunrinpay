module.exports = {
	publicPath: process.env.NODE_ENV === "production" ? "/Frontend/" : "/",
	outputDir: "docs",
	css: {
		loaderOptions: {
			scss: {
				prependData: `@import "@/variable.scss";`,
			},
		},
	},
};
