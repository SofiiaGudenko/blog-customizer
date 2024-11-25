import styles from './styles/index.module.scss';
import { ArrowButton } from './ui/arrow-button/ArrowButton';
import clsx from 'clsx';
import { useState, CSSProperties, SetStateAction } from 'react';
import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState, OptionType } from './constants/articleProps';

const App = () => {
	const [isSidebarOpen, setSidebarOpen] = useState(false);
	const [articleSettings, setArticleSettings] = useState(defaultArticleState);
	const applySettings = (
		newSettings: SetStateAction<{
			fontFamilyOption: OptionType;
			fontColor: OptionType;
			backgroundColor: OptionType;
			contentWidth: OptionType;
			fontSizeOption: OptionType;
		}>
	) => {
		setArticleSettings(newSettings);
	};
	const resetSettings = () => {
		setArticleSettings(defaultArticleState);
	};

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': articleSettings.fontFamilyOption.value,
					'--font-size': articleSettings.fontSizeOption.value,
					'--font-color': articleSettings.fontColor.value,
					'--container-width': articleSettings.contentWidth.value,
					'--bg-color': articleSettings.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				isOpen={isSidebarOpen}
				onClose={() => setSidebarOpen(false)}
				onApply={applySettings}
				onReset={resetSettings}
				defaultSettings={articleSettings}
			/>
			<Article />
			<ArrowButton
				isOpen={isSidebarOpen}
				onClick={() => setSidebarOpen(!isSidebarOpen)}
			/>
		</main>
	);
};

export default App;
