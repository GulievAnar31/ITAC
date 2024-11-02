type TableColumnKey = 'id' | 'name' | 'options' | 'price' | 'active' | 'createdAt' | 'updatedAt' | 'publishedAt' | 'title';
export type TableColumn = {
	key: TableColumnKey;
	header: string;
};

export type TableProps<T> = {
	data: T[];
	columns: TableColumn[];
	onEdit: (item: T) => void;
	filterText?: string;
};