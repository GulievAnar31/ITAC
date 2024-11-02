import { useState, useEffect } from 'react';
import { Product, PricePlan, Page } from '../../../Pages/MainPage';
import { ModalOverlay } from '../../../Shared/ModalOverlay';
import { ModalContent } from '../../../Shared/ModalContent';
import { ModalTitle } from '../../../Shared/ModalTitle';
import { InputContainer } from '../../../Shared/InputContainer';
import { Label } from '../../../Shared/Label';
import { Input } from '../../../Shared/Input';
import { Select } from '../../../Shared/Select';
import { ButtonContainer } from '../../../Shared/ButtonContainer';
import { CancelButton } from '../../../Shared/CancelButton';
import { SaveButton } from '../../../Shared/SaveButton';

type EditModalProps = {
	item: Product | PricePlan | Page | null;
	isOpen: boolean;
	onClose: () => void;
	onSave: (updatedItem: Product | PricePlan | Page) => void;
};

export function EditModal({
	item,
	isOpen,
	onClose,
	onSave,
}: EditModalProps) {
	const [editData, setEditData] = useState<Product | PricePlan | Page | null>(null);

	useEffect(() => {
		setEditData(item);
	}, [item]);

	if (!isOpen || !editData) return null;

	const handleChange = (
		key: keyof Product | keyof PricePlan | keyof Page | 'amount' | 'size',
		value: string
	) => {
		setEditData((prev) => {
			if (!prev) return prev;
			
			if ('options' in prev && (key === 'amount' || key === 'size')) {
				return {
					...prev,
					options: {
						...prev.options,
						[key]: value,
					},
				} as Product | PricePlan;
			}

			return { ...prev, [key]: value } as Product | PricePlan | Page;
		});
	};

	const handleActiveChange = (value: boolean) => {
		setEditData((prev) => {
			if (!prev) return prev;
			return { ...prev, active: value };
		});
	};

	const handleSave = () => {
		if (editData) onSave(editData);
		onClose();
	};

	return (
		<ModalOverlay>
			<ModalContent>
				<ModalTitle>Edit Item</ModalTitle>
				{/* Поля для Page */}
				{(editData as Page).title !== undefined ? (
					<InputContainer>
						<Label>Title</Label>
						<Input
							type="text"
							value={(editData as Page).title}
							onChange={(e) => handleChange("title", e.target.value)}
						/>
					</InputContainer>
				) : (editData as PricePlan).description !== undefined ? (
					<InputContainer>
						<Label>Description</Label>
						<Input
							type="text"
							value={(editData as PricePlan).description}
							onChange={(e) => handleChange("description", e.target.value)}
						/>
					</InputContainer>
				) : (
					<InputContainer>
						<Label>Name</Label>
						<Input
							type="text"
							value={(editData as Product).name}
							onChange={(e) => handleChange("name", e.target.value)}
						/>
					</InputContainer>
				)}
				{/* Поля для options */}
				{'options' in editData && (
					<>
						<InputContainer>
							<Label>Amount</Label>
							<Input
								type="text"
								value={editData.options.amount}
								onChange={(e) => handleChange("amount", e.target.value)}
							/>
						</InputContainer>
						<InputContainer>
							<Label>Size</Label>
							<Input
								type="text"
								value={editData.options.size}
								onChange={(e) => handleChange("size", e.target.value)}
							/>
						</InputContainer>
					</>
				)}
				<InputContainer>
					<Label>Active</Label>
					<Select
						value={editData.active ? "true" : "false"}
						onChange={(e) => handleActiveChange(e.target.value === "true")}
					>
						<option value="true">Yes</option>
						<option value="false">No</option>
					</Select>
				</InputContainer>
				<ButtonContainer>
					<SaveButton onClick={handleSave}>Save</SaveButton>
					<CancelButton onClick={onClose}>Cancel</CancelButton>
				</ButtonContainer>
			</ModalContent>
		</ModalOverlay>
	);
}