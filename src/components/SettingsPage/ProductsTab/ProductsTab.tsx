import React, { FC, useRef, useState } from 'react'
import { useAppSelector } from '../../../hooks/redux';
import './productstab.scss'
import { IoPencil } from '@react-icons/all-files/io5/IoPencil';
import { IoTrashOutline } from '@react-icons/all-files/io5/IoTrashOutline';
import { AddProduct } from '../../CompanyPage/CompanyCard/CompanyBlocks/OrderBlock/AddProduct/AddProduct';
import { IProduct } from '../../../types/IProduct';
import { EditProduct } from './EditProduct/EditProduct';

const ProductsTabInner: FC = () => {
	const { products } = useAppSelector(state => state.productReducer);

	const [showNewProduct, setShowNewProduct] = useState(false);
	// const [productItem, setProductItem] = useState<IProduct>({} as IProduct);
	const itemRef = useRef<IProduct>({} as IProduct);

	const showAddProduct = (product: IProduct) => {
    // setProductItem(product);
		itemRef.current = product;
    setShowNewProduct(true);
  }
	
	return (
		<>
			{showNewProduct ? 
				<EditProduct 
					isVisible={showNewProduct} 
					onClose={() => setShowNewProduct(false)}
					item={itemRef.current}
				/>
				: null
			}
			<div className='products-tab'>
				<div className="table">
					<div className="row">
						<div className="cell">Наименование</div>
						<div className="cell middle">Единица измерения</div>
						<div className="cell small"></div>
						<div className="cell small"></div>
					</div>
				{products.map(item => 
					<div key={item._id} className="row">
						<span className='cell first'>{item.title}</span>
						<span className='cell middle'>{item.dimension}</span>
						<div className="cell small">
							<IoPencil 
								// className='cell'
								style={{cursor: 'pointer'}}
								onClick={() => showAddProduct(item)}
								// onClick={() => updateShowPhoneHandler(true, item._id, item.number, item.description)}
								size={20}
								color={'#b4cb4c'}/>
						</div>
						<div className="cell small">
							<IoTrashOutline
								// className='cell'
								// onClick={() => deletePhoneHandler(item._id)}
								style={{cursor: 'pointer'}}
								size={20}
								// color={'#c02525'}
								/>

						</div>
						
					</div>
					)}
				</div>
			</div>
		</>
	)
}

export const ProductsTab = React.memo(ProductsTabInner)