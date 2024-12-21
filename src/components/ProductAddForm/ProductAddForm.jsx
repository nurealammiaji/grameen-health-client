import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { RiAddBoxFill, RiCheckFill, RiCloseFill, RiDeleteBin2Fill } from 'react-icons/ri';
import { ProductContext } from '../../providers/ProductProvider';
import Swal from 'sweetalert2';
import useShops from '../../hooks/useShops';
import useCategories from '../../hooks/useCategories';
import useSubCategories from '../../hooks/useSubCategories';
import useProducts from '../../hooks/useProducts';

const ProductAddForm = () => {

    const { register, handleSubmit, formState: { errors }, watch, reset } = useForm();
    const { isShopsLoading, shops, refetchShops, isShopsError, shopsError } = useShops();
    const { isCategoriesLoading, categories, refetchCategories, isCategoriesError, categoriesError } = useCategories();
    const { isSubCategoriesLoading, subCategories, refetchSubCategories, isSubCategoriesError, subCategoriesError } = useSubCategories();
    const { isProductsLoading, products, refetchProducts, isProductsError, productsError } = useProducts();
    const { t } = useTranslation();
    const [filesWithPreview, setFilesWithPreview] = useState([]);
    const [addVariants, setAddVariants] = useState(false);
    const { addProduct } = useContext(ProductContext);

    const [addSizes, setAddSizes] = useState(false);
    const [addColors, setAddColors] = useState(false);
    const [addPieces, setAddPieces] = useState(false);
    const [addGrades, setAddGrades] = useState(false);

    const [sizes, setSizes] = useState([]);
    const [colors, setColors] = useState([]);
    const [pieces, setPieces] = useState([]);
    const [grades, setGrades] = useState([]);

    const [sizeName, setSizeName] = useState('');
    const [colorName, setColorName] = useState('');
    const [pieceName, setPieceName] = useState('');
    const [gradeName, setGradeName] = useState('');

    const [sizePrice, setSizePrice] = useState(0);
    const [colorPrice, setColorPrice] = useState(0);
    const [piecePrice, setPiecePrice] = useState(0);
    const [gradePrice, setGradePrice] = useState(0);

    const [error, setError] = useState('');

    const campaignTypes = [
        { type: "Flash Sale", url: "flashSale" },
        { type: "New Arrivals", url: "newArrivals" },
        { type: "Festival Sale", url: "festivalSale" },
        { type: "Discount Sale", url: "discountSale" },
        { type: "Clearance Sale", url: "clearanceSale" },
    ];

    const handleCloseVariants = () => {
        setAddVariants(false);
        setAddSizes(false);
        setAddGrades(false);
        setAddColors(false);
        setAddPieces(false);
        setSizes([]);
        setColors([]);
        setPieces([]);
        setGrades([]);
    };

    const handleAddProduct = async (data) => {

        const variants = [
            { sizes: [...sizes] },
            { grades: [...grades] },
            { colors: [...colors] },
            { pieces: [...pieces] }
        ];

        try {
            const formData = new FormData();
            formData.append('type', 'product');
            formData.append('name', data.name);
            formData.append('quantity', data.quantity);
            formData.append('category', data.category);
            formData.append('subCategory', data.subCategory);
            formData.append('price', data.price);
            formData.append('specialPrice', data.specialPrice);
            formData.append('shop', data.shop);
            formData.append('advanceMoney', data.advanceMoney);
            formData.append('brand', data.brand);
            formData.append('originCountry', data.originCountry);
            formData.append('manufacturer', data.manufacturer);
            formData.append('model', data.model);
            formData.append('description', data.description);
            formData.append('rating', data.rating);
            formData.append('campaign', data.campaign);
            formData.append('variants', JSON.stringify(variants));

            filesWithPreview.forEach(item => {
                formData.append('images[]', item.file);
            });

            console.log('Form Data before sending:', Array.from(formData.entries()));

            const response = await addProduct(formData);
            console.log('Response from server:', response.data);

            Swal.fire({
                target: document.getElementById('add_product_modal'),
                position: "center",
                icon: "success",
                title: "Added Successfully !!",
                showConfirmButton: false,
                timer: 1500
            });

            refetchProducts();
            setAddVariants(false);
            setSizes([]);
            setGrades([]);
            setColors([]);
            setPieces([]);
            setFilesWithPreview([]);
            reset();

        } catch (error) {
            console.error('Error from backend:', error.response ? error.response.data : error.message);
            Swal.fire({
                target: document.getElementById('add_product_modal'),
                position: "center",
                icon: "error",
                title: `Axios: ${error.message}`,
                showConfirmButton: false,
                timer: 1500
            });
        }
    };

    // Handle file changes
    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        const newFilesWithPreview = files.map(file => ({
            file,
            preview: URL.createObjectURL(file), // Create a blob URL for preview
        }));
        setFilesWithPreview(prev => [...prev, ...newFilesWithPreview]);
        event.target.value = ''; // Clear the input for the same file upload
    };

    // Remove an image
    const removeImage = (index) => {
        setFilesWithPreview(prev => {
            const updatedFiles = [...prev];
            URL.revokeObjectURL(updatedFiles[index].preview); // Cleanup URL
            updatedFiles.splice(index, 1); // Remove image
            return updatedFiles; // Return updated files
        });
    };

    // Add new sizes
    const handleAddSize = () => {
        if (sizeName && !sizes.some(size => size.name === sizeName)) {
            setSizes([...sizes, { name: sizeName, price: sizePrice ? sizePrice : 0 }]); // Default price 0
            setSizeName('');
            setSizePrice(0);
        } else {
            setError('Size is either invalid or already exists.');
        }
    };

    // Add new grades
    const handleAddGrade = () => {
        if (gradeName && !grades.some(grade => grade.name === gradeName)) {
            setGrades([...grades, { name: gradeName, price: gradePrice ? gradePrice : 0 }]); // Default price 0
            setGradeName('');
            setGradePrice(0);
        } else {
            setError('Grade is either invalid or already exists.');
        }
    };

    // Add new colors
    const handleAddColor = () => {
        if (colorName && !colors.some(color => color.name === colorName)) {
            setColors([...colors, { name: colorName, price: colorPrice ? colorPrice : 0 }]); // Default price 0
            setColorName('');
            setColorPrice(0);
        } else {
            setError('Color is either invalid or already exists.');
        }
    };

    // Add new pieces
    const handleAddPiece = () => {
        if (pieceName && !pieces.some(piece => piece.name === pieceName)) {
            setPieces([...pieces, { name: pieceName, price: piecePrice ? piecePrice : 0 }]); // Default price 0
            setPieceName('');
            setPiecePrice(0);
        } else {
            setError('Piece is either invalid or already exists.');
        }
    };

    useEffect(() => {
        if (!addVariants) {
            setSizes([]);
            setGrades([]);
            setColors([]);
            setPieces([]);
        }
        if (!addSizes) {
            setSizes([]);
        }
        if (!addGrades) {
            setGrades([]);
        }
        if (!addColors) {
            setColors([]);
        }
        if (!addPieces) {
            setPieces([]);
        }
    }, [addVariants, products, addSizes, addGrades, addColors, addPieces, setSizes, setGrades, setColors, setPieces]);

    return (
        <div>
            <form onSubmit={handleSubmit(handleAddProduct)} className="p-5 mx-auto border rounded-xl bg-base-200">
                <div className="grid gap-5 md:grid-cols-2">
                    <div className="w-full form-control">
                        <label className="label">
                            <span className="font-semibold label-text">Product Name</span>
                        </label>
                        <input {...register("name", { required: true })} type="text" placeholder="Type name here" className="w-full input input-bordered" />
                        {errors.name?.type === 'required' && <span className="text-error">{t('requiredName')} !!</span>}
                    </div>
                    <div className="w-full form-control">
                        <label className="label">
                            <span className="font-semibold label-text">Quantity</span>
                        </label>
                        <input {...register("quantity", { required: true, min: 1 })} type="number" min={1} placeholder="Type quantity here" className="w-full input input-bordered" />
                        {errors.quantity?.type === 'required' && <span className="text-error">{t('requiredQuantity')} !!</span>}
                    </div>
                    <div className="w-full form-control">
                        <label className="label">
                            <span className="font-semibold label-text">Price</span>
                        </label>
                        <input {...register("price", { required: true, min: 0 })} type="number" min={0} placeholder="Type price here" className="w-full input input-bordered" />
                        {errors.price?.type === 'required' && <span className="text-error">{t('requiredPrice')} !!</span>}
                    </div>
                    <div className="w-full form-control">
                        <label className="label">
                            <span className="font-semibold label-text">Special Price</span>
                        </label>
                        <input {...register("specialPrice", { required: true, min: 0 })} type="number" min={0} placeholder="Type special price here" className="w-full input input-bordered" />
                        {errors.specialPrice?.type === 'required' && <span className="text-error">{t('requiredSpecialPrice')} !!</span>}
                    </div>
                    <div className="w-full form-control">
                        <label className="label">
                            <span className="font-semibold label-text">Category</span>
                        </label>
                        <select {...register("category", { required: true })} className="w-full select select-bordered">
                            <option value="">select category</option>
                            {
                                (categories) &&
                                categories.map((category, index) => (
                                    <option key={index} value={category._id}>{category.name}</option>
                                ))
                            }
                        </select>
                        {errors.category?.type === 'required' && <span className="text-error">{t('requiredCategory')} !!</span>}
                    </div>
                    <div className="w-full form-control">
                        <label className="label">
                            <span className="font-semibold label-text">Sub Category</span>
                        </label>
                        <select {...register("subCategory", { required: true })} className="w-full select select-bordered">
                            <option value="">select sub category</option>
                            {
                                (subCategories) &&
                                subCategories.map((subCategory, index) => (
                                    <option key={index} value={subCategory._id}>{subCategory.name}</option>
                                ))
                            }
                        </select>
                        {errors.subCategory?.type === 'required' && <span className="text-error">{t('requiredSubCategory')} !!</span>}
                    </div>
                    <div className="w-full form-control">
                        <label className="label">
                            <span className="font-semibold label-text">Shop</span>
                        </label>
                        <select {...register("shop", { required: true })} className="w-full select select-bordered">
                            <option value="">select shop</option>
                            {
                                (shops) &&
                                shops.map((shop, index) => (
                                    <option key={index} value={shop._id}>{shop.name}</option>
                                ))
                            }
                        </select>
                        {errors.shop?.type === 'required' && <span className="text-error">{t('requiredShop')} !!</span>}
                    </div>
                    <div className="w-full form-control">
                        <label className="label">
                            <span className="font-semibold label-text">Advance Money</span>
                        </label>
                        <input {...register("advanceMoney", { required: true, min: 0 })} type="number" placeholder="Type advance money here" className="w-full input input-bordered" />
                        {errors.advanceMoney?.type === 'required' && <span className="text-error">{t('requiredAdvanceMoney')} !!</span>}
                    </div>
                    <div className="w-full form-control">
                        <label className="label">
                            <span className="font-semibold label-text">Brand Name</span>
                        </label>
                        <input {...register("brand", { required: true })} type="text" placeholder="Type brand here" className="w-full input input-bordered" />
                        {errors.brand?.type === 'required' && <span className="text-error">{t('requiredBrand')} !!</span>}
                    </div>
                    <div className="w-full form-control">
                        <label className="label">
                            <span className="font-semibold label-text">Model</span>
                        </label>
                        <input {...register("model", { required: true })} type="text" placeholder="Type model here" className="w-full input input-bordered" />
                        {errors.model?.type === 'required' && <span className="text-error">{t('requiredModel')} !!</span>}
                    </div>
                    <div className="w-full form-control">
                        <label className="label">
                            <span className="font-semibold label-text">Origin Country</span>
                        </label>
                        <input {...register("originCountry", { required: true })} type="text" placeholder="Type origin country here" className="w-full input input-bordered" />
                        {errors.originCountry?.type === 'required' && <span className="text-error">{t('requiredOriginCountry')} !!</span>}
                    </div>
                    <div className="w-full form-control">
                        <label className="label">
                            <span className="font-semibold label-text">Manufacturer</span>
                        </label>
                        <input {...register("manufacturer", { required: true })} type="text" placeholder="Type manufacturer here" className="w-full input input-bordered" />
                        {errors.manufacturer?.type === 'required' && <span className="text-error">{t('requiredManufacturer')} !!</span>}
                    </div>
                    <div className="w-full form-control">
                        <label className="label">
                            <span className="font-semibold label-text">Rating</span>
                        </label>
                        <input
                            {...register("rating", {
                                required: true,
                                min: 1,
                                max: 5,
                                valueAsNumber: true,
                                validate: value => !isNaN(value) && value >= 1 && value <= 5,
                            })}
                            type="number"
                            min={1}
                            max={5}
                            step="any"
                            placeholder="Type quantity here"
                            className="w-full input input-bordered"
                        />
                        {errors.rating?.type === 'required' && <span className="text-error">{t('requiredRating')} !!</span>}
                        {errors.rating?.type === 'validate' && <span className="text-error">Rating must be between 1 and 5!</span>}
                    </div>
                    <div className="w-full form-control">
                        <label className="label">
                            <span className="font-semibold label-text">Campaign</span>
                        </label>
                        <select {...register("campaign", { required: true })}
                            className="w-full select select-bordered">
                            <option value="">select type</option>
                            {
                                (campaignTypes) &&
                                campaignTypes.map((type, index) => <option key={index} value={type.url} className="font-medium" >{type.type}</option>)
                            }
                        </select>
                        {errors.campaign?.type === 'required' && <span className="text-error">{t('requiredCampaign')} !!</span>}
                    </div>

                </div>

                <div className="w-full mt-5 form-control">
                    <label className="label">
                        <span className="font-semibold label-text">Description</span>
                    </label>
                    <textarea {...register("description", { required: true })} rows={5} className="w-full textarea textarea-bordered" placeholder="Type descriptions here"></textarea>
                    {errors.description?.type === 'required' && <span className="text-error">{t('requiredDescription')} !!</span>}
                </div>

                {/* Variants Input */}
                <div className={`${addVariants ? 'block' : 'hidden'} w-full mt-5 form-control`}>
                    <label className="label">
                        <span className="font-semibold label-text">Variants <span className="font-normal">(Size/Grade/Color/Pieces)</span>
                        </span>
                    </label>
                    {/* Add Size */}
                    <div className={`${addSizes ? 'flex w-full form-control mt-5' : 'hidden'}`}>
                        <label className="text-sm">Add Sizes (e.g. Small, Medium, Large)</label>
                        {/* User-defined size input */}
                        <div className="flex items-center gap-3 mt-3 justify-evenly">
                            <div className="tooltip" data-tip="Size Name">
                                <input
                                    type="text"
                                    value={sizeName}
                                    onChange={(e) => setSizeName(e.target.value)}
                                    placeholder="Size Name"
                                    className="w-full input input-bordered input-sm"
                                />
                            </div>
                            <div className="tooltip" data-tip="Additional Price">
                                <input
                                    type="text"
                                    value={sizePrice}
                                    onChange={(e) => setSizePrice(Number(e.target.value))}
                                    placeholder="Additional Price"
                                    className="w-full input input-bordered input-sm"
                                />
                            </div>
                            <div className="tooltip" data-tip="Add">
                                <button className="btn btn-sm btn-success btn-circle" type="button" onClick={handleAddSize}><RiCheckFill className="text-xl text-white" /></button>
                            </div>
                            <div className="tooltip" data-tip="Close">
                                <button type="button" onClick={() => {
                                    setAddSizes(false)
                                    setSizes([])
                                }} className="btn btn-sm btn-error btn-circle"><RiCloseFill className="text-xl text-white" /></button>
                            </div>
                        </div>
                        {/* Selected sizes */}
                        <div className={`${sizes.length > 0 ? 'block mt-3' : 'hidden'}`}>
                            <div className="text-sm text-center">
                                <label>Selected Sizes:</label>
                            </div>
                            <div className="flex flex-wrap items-center justify-center gap-3 mt-3">
                                {sizes?.map((size, index) => (
                                    <span key={index} className="flex items-center gap-2 p-2 border-2 rounded-full border-primary">
                                        <span className="btn btn-xs btn-primary" value={size.name}>{size.name}</span>
                                        <span className='btn btn-xs btn-primary'>{size.price}</span>
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                    {/* Add Grade */}
                    <div className={`${addGrades ? 'flex w-full form-control mt-5' : 'hidden'}`}>
                        <label className="text-sm">Add Grades (e.g. Grade 1, Grade 2, Grade 3)</label>
                        {/* User-defined grade input */}
                        <div className="flex items-center gap-3 mt-3 justify-evenly">
                            <div className="tooltip" data-tip="Grade Name">
                                <input
                                    type="text"
                                    value={gradeName}
                                    onChange={(e) => setGradeName(e.target.value)}
                                    placeholder="Grade Name"
                                    className="w-full input input-bordered input-sm"
                                />
                            </div>
                            <div className="tooltip" data-tip="Additional Price">
                                <input
                                    type="text"
                                    value={gradePrice}
                                    onChange={(e) => setGradePrice(Number(e.target.value))}
                                    placeholder="Additional Price"
                                    className="w-full input input-bordered input-sm"
                                />
                            </div>
                            <div className="tooltip" data-tip="Add">
                                <button className="btn btn-sm btn-success btn-circle" type="button" onClick={handleAddGrade}><RiCheckFill className="text-xl text-white" /></button>
                            </div>
                            <div className="tooltip" data-tip="Close">
                                <button type="button" onClick={() => {
                                    setAddGrades(false)
                                    setGrades([])
                                }} className="btn btn-sm btn-error btn-circle"><RiCloseFill className="text-xl text-white" /></button>
                            </div>
                        </div>
                        {/* Selected grades */}
                        <div className={`${grades.length > 0 ? 'block mt-3' : 'hidden'}`}>
                            <div className="text-sm text-center">
                                <label>Selected Grades:</label>
                            </div>
                            <div className="flex flex-wrap items-center justify-center gap-3 mt-3">
                                {grades?.map((grade, index) => (
                                    <span key={index} className="flex items-center gap-2 p-2 border-2 rounded-full border-primary">
                                        <span className="btn btn-xs btn-primary">{grade.name}</span>
                                        <span className='btn btn-xs btn-primary'>{grade.price}</span>
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                    {/* Add Colors */}
                    <div className={`${addColors ? 'flex w-full form-control mt-5' : 'hidden'}`}>
                        <label className="text-sm">Add Colors (e.g. Black, White, Red etc.)</label>
                        {/* User-defined size input */}
                        <div className="flex items-center gap-3 mt-3 justify-evenly">
                            <div className="tooltip" data-tip="Color Name">
                                <input
                                    type="text"
                                    value={colorName}
                                    onChange={(e) => setColorName(e.target.value)}
                                    placeholder="Color Name"
                                    className="w-full input input-bordered input-sm"
                                />
                            </div>
                            <div className="tooltip" data-tip="Additional Price">
                                <input
                                    type="text"
                                    value={colorPrice}
                                    onChange={(e) => setColorPrice(Number(e.target.value))}
                                    placeholder="Additional Price"
                                    className="w-full input input-bordered input-sm"
                                />
                            </div>
                            <div className="tooltip" data-tip="Add">
                                <button className="text-white btn btn-sm btn-circle btn-success" type="button" onClick={handleAddColor}><RiCheckFill className="text-xl text-white" /></button>
                            </div>
                            <div className="tooltip" data-tip="Close">
                                <button type="button" onClick={() => {
                                    setAddColors(false)
                                    setColors([])
                                }} className="btn btn-sm btn-error btn-circle"><RiCloseFill className="text-xl text-white" /></button>
                            </div>
                        </div>
                        {/* Selected size */}
                        <div className={`${colors.length > 0 ? 'block mt-3' : 'hidden'}`}>
                            <div className="text-sm text-center">
                                <label>Selected Sizes:</label>
                            </div>
                            <div className="flex flex-wrap items-center justify-center gap-3 mt-3">
                                {colors?.map((color, index) => (
                                    <span key={index} className="flex items-center gap-2 p-2 border-2 rounded-full border-primary">
                                        <span className="btn btn-xs btn-primary">{color.name}</span>
                                        <span className='btn btn-xs btn-primary'>{color.price}</span>
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                    {/* Add Pieces */}
                    <div className={`${addPieces ? 'flex w-full form-control mt-5' : 'hidden'}`}>
                        <label className="text-sm">Add Pieces (e.g. 6P, 12P, 24P etc.)</label>
                        {/* User-defined piece input */}
                        <div className="flex items-center gap-3 mt-3 justify-evenly">
                            <div className="tooltip" data-tip="Piece Name">
                                <input
                                    type="text"
                                    value={pieceName}
                                    onChange={(e) => setPieceName(e.target.value)}
                                    placeholder="Piece Name"
                                    className="w-full input input-bordered input-sm"
                                />
                            </div>
                            <div className="tooltip" data-tip="Additional Price">
                                <input
                                    type="text"
                                    value={piecePrice}
                                    onChange={(e) => setPiecePrice(Number(e.target.value))}
                                    placeholder="Additional Price"
                                    className="w-full input input-bordered input-sm"
                                />
                            </div>
                            <div className="tooltip" data-tip="Add">
                                <button className="btn btn-sm btn-success btn-circle" type="button" onClick={handleAddPiece}><RiCheckFill className="text-xl text-white" /></button>
                            </div>
                            <div className="tooltip" data-tip="Close">
                                <button type="button" onClick={() => {
                                    setAddPieces(false)
                                    setPieces([])
                                }} className="btn btn-sm btn-error btn-circle"><RiCloseFill className="text-xl text-white" /></button>
                            </div>
                        </div>
                        {/* Selected Pieces */}
                        <div className={`${pieces.length > 0 ? 'block mt-3' : 'hidden'}`}>
                            <div className="text-sm text-center">
                                <label>Selected Pieces:</label>
                            </div>
                            <div className="flex flex-wrap items-center justify-center gap-3 mt-3">
                                {pieces?.map((piece, index) => (
                                    <span key={index} className="flex items-center gap-2 p-2 border-2 rounded-full border-primary">
                                        <span className="btn btn-xs btn-primary" value={piece.name}>{piece.name}</span>
                                        <span className='btn btn-xs btn-primary'>{piece.price}</span>
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-center gap-5 mt-6">
                        <div className="tooltip" data-tip="Add Sizes">
                            <button disabled={addSizes} type="button" onClick={() => setAddSizes(true)} className={`${addSizes ? "btn-ghost" : "btn-info"} btn btn-xs`}>
                                <RiAddBoxFill /> Sizes
                            </button>
                        </div>
                        <div className="tooltip" data-tip="Add Grades">
                            <div>
                                <button disabled={addGrades} type="button" onClick={() => setAddGrades(true)} className={`${addGrades ? "btn-ghost" : "btn-info"} btn btn-xs`}>
                                    <RiAddBoxFill /> Grades
                                </button>
                            </div>
                        </div>
                        <div className="tooltip" data-tip="Add Colors">
                            <button type="button" disabled={addColors} onClick={() => setAddColors(true)} className={`${addColors ? "btn-ghost" : "btn-info"} btn btn-xs`}>
                                <RiAddBoxFill /> Colors
                            </button>
                        </div>
                        <div className="tooltip" data-tip="Add Pieces">
                            <button type="button" disabled={addPieces} onClick={() => setAddPieces(true)} className={`${addPieces ? "btn-ghost" : "btn-info"} btn btn-xs`}>
                                <RiAddBoxFill /> Pieces
                            </button>
                        </div>
                    </div>
                    {/* <div className="my-6 text-center">
                        <hr className="border-2 border-base-300" />
                        <small className="text-error">N.B </small>
                        <small className="mt-5">After defining all the variants, click 'Add' to save them</small>
                        <hr className="border-2 border-base-300" />
                    </div> */}
                    {/* <div className="flex justify-center gap-5">
                        <div className="tooltip" data-tip="Add Variants">
                            <button type="button" className="text-white btn btn-success btn-sm btn-outline">Add</button>
                        </div>
                        <div className="tooltip" data-tip="Close Variants">
                            <button type="button" onClick={handleCloseVariants} className="text-white btn btn-error btn-sm btn-outline">Close</button>
                        </div>
                    </div> */}
                </div>
                <div className={`${addVariants ? 'hidden' : 'flex w-full mt-5 form-control'}`}>
                    <button onClick={() => setAddVariants(true)} type="button" className="btn btn-info">
                        <RiAddBoxFill /> Add Variants
                    </button>
                </div>

                {/* File Upload Section */}
                <div className="w-full mt-5 form-control">
                    <label className="label">
                        <span className="font-semibold label-text">Upload Images {(filesWithPreview?.length > 0) ? <span className="font-normal text-success">(Selected: {(filesWithPreview?.length > 1) ? `${filesWithPreview?.length} Images` : `${filesWithPreview?.length} Image`})</span> : <span className="font-normal text-info">(Max: 5 Images)</span>}</span>
                    </label>
                    <input
                        type="file"
                        id="fileUpload"
                        multiple
                        accept="image/*"
                        {...register('images')}
                        onChange={handleFileChange}
                        className={`${filesWithPreview?.length === 5 ? "hidden" : "file-input w-full file-input-bordered"}`}
                    />
                </div>

                {/* Image Previews */}
                <div className="grid grid-cols-3 gap-4 mt-5">
                    {filesWithPreview.map((item, index) => (
                        <div key={index} className="relative">
                            <img src={item.preview} alt={`Preview ${index}`} className="w-full h-40 rounded" />
                            <button
                                type="button"
                                onClick={() => removeImage(index)}
                                className="absolute top-0 right-0 p-1 text-red-500 bg-white rounded-full hover:bg-gray-200"
                            >
                                <RiDeleteBin2Fill />
                            </button>
                        </div>
                    ))}
                </div>

                {/* Submit Button */}
                <button type="submit" className="w-full mt-8 btn btn-success">{t('addProduct')}</button>

            </form >
        </div >
    );
};

export default ProductAddForm;
