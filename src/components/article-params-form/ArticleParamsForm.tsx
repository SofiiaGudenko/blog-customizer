import { useState, useRef } from 'react';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Button } from 'src/ui/button';
import { Text } from 'src/ui/text';
import { ArrowButton } from 'src/ui/arrow-button/ArrowButton';
import {
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	ArticleStateType,
	defaultArticleState,
} from 'src/constants/articleProps';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';
import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	onApply: (settings: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ onApply }: ArticleParamsFormProps) => {
	const [isSidebarOpen, setSidebarOpen] = useState(false);
	const [tempSettings, setTempSettings] = useState(defaultArticleState);
	const formRef = useRef<HTMLDivElement | null>(null);

	useOutsideClickClose({
		isOpen: isSidebarOpen,
		rootRef: formRef,
		onClose: () => setSidebarOpen(false),
		onChange: (value) => {
			if (!value) setSidebarOpen(false);
		},
	});

	const handleChange = <K extends keyof ArticleStateType>(
		key: K,
		value: ArticleStateType[K]
	) => {
		setTempSettings((prev) => ({ ...prev, [key]: value }));
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		onApply(tempSettings);
		setSidebarOpen(false);
	};

	const handleReset = () => {
		setTempSettings(defaultArticleState);
		onApply(defaultArticleState);
		setSidebarOpen(false);
	};

	return (
		<>
			<ArrowButton
				isOpen={isSidebarOpen}
				onClick={() => setSidebarOpen(!isSidebarOpen)}
			/>
			<aside
				className={`${styles.container} ${
					isSidebarOpen ? styles.container_open : ''
				}`}
				ref={formRef}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<Text as='h1' size={25} weight={800} uppercase>
						Задайте параметры
					</Text>

					<Select
						selected={tempSettings.fontFamilyOption}
						onChange={(option) => handleChange('fontFamilyOption', option)}
						options={fontFamilyOptions}
						title='Шрифт'
					/>

					<RadioGroup
						name='fontSize'
						selected={tempSettings.fontSizeOption}
						onChange={(option) => handleChange('fontSizeOption', option)}
						options={fontSizeOptions}
						title='Размер шрифта'
					/>

					<Select
						selected={tempSettings.fontColor}
						onChange={(option) => handleChange('fontColor', option)}
						options={fontColors}
						title='Цвет шрифта'
					/>

					<Separator />

					<Select
						selected={tempSettings.backgroundColor}
						onChange={(option) => handleChange('backgroundColor', option)}
						options={backgroundColors}
						title='Цвет фона'
					/>

					<Select
						selected={tempSettings.contentWidth}
						onChange={(option) => handleChange('contentWidth', option)}
						options={contentWidthArr}
						title='Ширина контента'
					/>

					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='button'
							type='clear'
							onClick={handleReset}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
