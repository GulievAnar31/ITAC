import { EditButton } from '../../../Shared/EditButton';
import { StyledCell } from '../../../Shared/StyledCell';
import { StyledHeader } from '../../../Shared/StyledHeader';
import { TableWrapper } from '../../../Shared/TableWrapper';
import { TableProps } from '../types/type';

export function Table<T extends Record<string, unknown>>({
	data,
	columns,
	onEdit,
	filterText = '',
}: TableProps<T>) {
	const filteredData = data.filter((item) =>
		columns.some((col) =>
			String(item[col.key]).toLowerCase().includes(filterText.toLowerCase())
		)
	);

	const renderCellContent = (key: keyof T, value: unknown) => {
		if (typeof value === 'object' && value !== null) {
			if (key === 'options') {
				const options = value as { size?: string; amount?: number };
				return `Size: ${options.size}, Amount: ${options.amount}`;
			}
			return JSON.stringify(value);
		}
		return String(value);
	};

	return (
		<TableWrapper>
			<thead>
				<tr>
					{columns.map((col) => (
						<StyledHeader key={String(col.key)}>{col.header}</StyledHeader>
					))}
					<StyledHeader>Edit</StyledHeader>
				</tr>
			</thead>
			<tbody>
				{filteredData.map((item) => (
					<tr key={String(item.id)}>
						{columns.map((col) => (
							<StyledCell key={String(col.key)}>
								{renderCellContent(col.key, item[col.key])}
							</StyledCell>
						))}
						<StyledCell>
							<EditButton onClick={() => onEdit(item)}>Edit</EditButton>
						</StyledCell>
					</tr>
				))}
			</tbody>
		</TableWrapper>
	);
}
