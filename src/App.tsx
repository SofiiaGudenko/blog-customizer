import styles from './styles/index.module.scss';
import { ArrowButton } from './ui/arrow-button/ArrowButton';
import { useState, CSSProperties } from 'react';
import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from './constants/articleProps';

const App = () => {
	const [isSidebarOpen, setSidebarOpen] = useState(false);
	const [articleSettings, setArticleSettings] = useState(defaultArticleState);

	const applySettings = (newSettings: typeof defaultArticleState) => {
		setArticleSettings(newSettings);
	};

	return (
		<main
			className={styles.main}
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
