import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Table } from '../Widgets/Table';
import { EditModal } from '../Widgets/EditModal';
import axios from 'axios';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { TableColumn } from '../Widgets/Table/types/type';
import { Navigation } from '../Widgets/Navigation';

export type Product = {
	id: number;
	name: string;
	options: {
		size: string;
		amount: number;
	};
	active: boolean;
	createdAt: string;
};

export type PricePlan = {
	id: number;
	description: string;
	price: number;
	active: boolean;
	createdAt: string;
	options: {
		amount: string;
		size: string;
	}
};

export type Page = {
	id: number;
	title: string;
	active: boolean;
	updatedAt: string;
	publishedAt: string;
};

type TableConfig<T> = {
	data: T[];
	columns: { key: string; header: string }[];
};

const SearchInput = styled.input`
	padding: 10px; /* Отступы внутри поля */
	border: 1px solid #ccc; /* Цвет границы */
	border-radius: 5px; /* Закругленные углы */
	margin-bottom: 15px; /* Отступ снизу */
	width: 100%; /* Ширина 100% */
	box-sizing: border-box; /* Учитываем отступы и границы в ширине */
`;

const Container = styled.div`
	display: flex;
	flex-direction: column;
	margin: 20px;
`;

const MainPage: React.FC = () => {
	const [data, setData] = useState<{
		products: Product[];
		pricePlans: PricePlan[];
		pages: Page[];
	}>({
		products: [],
		pricePlans: [],
		pages: []
	});
	const [filterText, setFilterText] = useState('');
	const [editingItem, setEditingItem] = useState<Product | PricePlan | Page | null>(null);
	const [currentTable, setCurrentTable] = useState<'products' | 'price-plans' | 'pages'>('products');
	const location = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		if (location.pathname === '/') {
			navigate('/products');
		}
	}, [location.pathname, navigate]);

	const fetchProducts = async () => {
		const res = await axios.get<Product[]>('https://my-json-server.typicode.com/GulievAnar31/jsonFake/products');
		setData(prev => ({ ...prev, products: res.data }));
	};

	const fetchPricePlans = async () => {
		const res = await axios.get<PricePlan[]>('https://my-json-server.typicode.com/GulievAnar31/jsonFake/pricePlans');
		setData(prev => ({ ...prev, pricePlans: res.data }));
	};

	const fetchPages = async () => {
		const res = await axios.get<Page[]>('https://my-json-server.typicode.com/GulievAnar31/jsonFake/pages');
		setData(prev => ({ ...prev, pages: res.data }));
	};

	const handleEdit = (item: Product | PricePlan | Page) => setEditingItem(item);

	const handleSave = (updatedItem: Product | PricePlan | Page) => {
		setData(prev => {
			const updatedData = { ...prev };

			if (currentTable === 'products' && isProduct(updatedItem)) {
				updatedData.products = updatedData.products.map(item =>
					item.id === updatedItem.id ? updatedItem : item
				);
			} else if (currentTable === 'price-plans' && isPricePlan(updatedItem)) {
				updatedData.pricePlans = updatedData.pricePlans.map(item =>
					item.id === updatedItem.id ? updatedItem : item
				);
			} else if (currentTable === 'pages' && isPage(updatedItem)) {
				updatedData.pages = updatedData.pages.map(item =>
					item.id === updatedItem.id ? updatedItem : item
				);
			}

			return updatedData;
		});
	};

	function isProduct(item: unknown): item is Product {
		return (item as Product).options !== undefined;
	}

	function isPricePlan(item: unknown): item is PricePlan {
		return (item as PricePlan).price !== undefined;
	}

	function isPage(item: unknown): item is Page {
		return (item as Page).title !== undefined;
	}

	const handleToggle = (name: 'products' | 'price-plans' | 'pages') => {
		setCurrentTable(name);
		setEditingItem(null);
	};

	useEffect(() => {
		const fetchData = async () => {
			if (currentTable === 'products') {
				await fetchProducts();
			} else if (currentTable === 'price-plans') {
				await fetchPricePlans();
			} else {
				await fetchPages();
			}
		};

		fetchData();
	}, [currentTable]);

	useEffect(() => {
		const path = location.pathname.split('/')[1] as 'products' | 'price-plans' | 'pages';
		handleToggle(path);
	}, [location.pathname]);

	const tableConfigs: Record<string, TableConfig<Product | PricePlan | Page>> = {
		products: {
			data: data.products.filter(product => product.name.includes(filterText)),
			columns: [
				{ key: 'id', header: 'ID' },
				{ key: 'name', header: 'Name' },
				{ key: 'options', header: 'Options' },
				{ key: 'active', header: 'Active' },
				{ key: 'createdAt', header: 'Created At' },
			],
		},
		pricePlans: {
			data: data.pricePlans.filter(pricePlan => pricePlan.description.includes(filterText)),
			columns: [
				{ key: 'id', header: 'ID' },
				{ key: 'description', header: 'Description' },
				{ key: 'createdAt', header: 'Created At' },
				{ key: 'active', header: 'Active' },
			],
		},
		pages: {
			data: data.pages.filter(page => page.title.includes(filterText)),
			columns: [
				{ key: 'id', header: 'ID' },
				{ key: 'title', header: 'Title' },
				{ key: 'active', header: 'Active' },
				{ key: 'updatedAt', header: 'Updated At' },
				{ key: 'publishedAt', header: 'Published At' },
			],
		},
	};

	return (
		<Container>
			<Navigation />
			<SearchInput
				type="text"
				placeholder="Search..."
				value={filterText}
				onChange={(e) => setFilterText(e.target.value)}
			/>
			<Routes>
				<Route path="/products" element={
					<Table
						data={tableConfigs.products.data}
						columns={tableConfigs.products.columns as TableColumn[]}
						onEdit={handleEdit}
					/>
				} />
				<Route path="/price-plans" element={
					<Table
						data={tableConfigs.pricePlans.data}
						columns={tableConfigs.pricePlans.columns as TableColumn[]}
						onEdit={handleEdit}
					/>
				} />
				<Route path="/pages" element={
					<Table
						data={tableConfigs.pages.data}
						columns={tableConfigs.pages.columns as TableColumn[]}
						onEdit={handleEdit}
					/>
				} />
			</Routes>
			<EditModal
				item={editingItem}
				isOpen={!!editingItem}
				onClose={() => setEditingItem(null)}
				onSave={handleSave}
			/>
		</Container>
	);
};

export default MainPage;