import { useState, useEffect } from 'react';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Button } from 'src/ui/button';
import { Text } from 'src/ui/text';
import {
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	ArticleStateType,
} from 'src/constants/articleProps';
import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	isOpen: boolean;
	onClose: () => void;
	onApply: (settings: ArticleStateType) => void;
	onReset: () => void;
	defaultSettings: ArticleStateType;
};

export const ArticleParamsForm = ({
	isOpen,
	onClose,
	onApply,
	onReset,
	defaultSettings,
}: ArticleParamsFormProps) => {
	const [formSettings, setFormSettings] = useState(defaultSettings);

	useEffect(() => {
		setFormSettings(defaultSettings);
	}, [defaultSettings]);

	const handleChange = (key: keyof ArticleStateType, value: any) => {
		setFormSettings((prev) => ({ ...prev, [key]: value }));
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		onApply(formSettings);
		onClose();
	};

	return (
		<aside
			className={`${styles.container} ${isOpen ? styles.container_open : ''}`}>
			<form className={styles.form} onSubmit={handleSubmit}>
				<Text as='h1' size={25} weight={800} uppercase>
					Задайте параметры
				</Text>

				<Select
					selected={formSettings.fontFamilyOption}
					onChange={(option) => handleChange('fontFamilyOption', option)}
					options={fontFamilyOptions}
					title='Шрифт'
				/>

				<RadioGroup
					name='fontSize'
					selected={formSettings.fontSizeOption}
					onChange={(option) => handleChange('fontSizeOption', option)}
					options={fontSizeOptions}
					title='Размер шрифта'
				/>

				<Select
					selected={formSettings.fontColor}
					onChange={(option) => handleChange('fontColor', option)}
					options={fontColors}
					title='Цвет шрифта'
				/>

				<Separator />

				<Select
					selected={formSettings.backgroundColor}
					onChange={(option) => handleChange('backgroundColor', option)}
					options={backgroundColors}
					title='Цвет фона'
				/>

				<Select
					selected={formSettings.contentWidth}
					onChange={(option) => handleChange('contentWidth', option)}
					options={contentWidthArr}
					title='Ширина контента'
				/>

				<div className={styles.bottomContainer}>
					<Button
						title='Сбросить'
						htmlType='button'
						type='clear'
						onClick={() => {
							onReset();
							onClose();
						}}
					/>
					<Button title='Применить' htmlType='submit' type='apply' />
				</div>
			</form>
		</aside>
	);
};
