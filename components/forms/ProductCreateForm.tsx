// "use client"
// import React, { useState, useEffect } from 'react';

// // Interface for managing image file and its preview URL
// interface ImageState {
//     file: File | null;
//     preview: string;
// }

// // Updated form state to handle image files
// interface IProductFormState {
//     name: string;
//     description: string;
//     brand: string;
//     category: string;
//     basePrice: number | string;
//     imageUrl: ImageState; // Corresponds to 'thumbnail' in the schema
//     images: ImageState[]; // Corresponds to 'images' array in the schema
//     stock: number | string;
//     tags: string;
//     isFeatured: boolean;
//     status: "ACTIVE" | "DRAFT" | "INACTIVE" | "OUT OF STOCK";
//     variants: {
//         sku: string;
//         priceModifier: number | string;
//         stock: number | string;
//         attributes: {
//             name: string;
//             value: string;
//         }[];
//         images: ImageState[]; // Changed from string[]
//     }[];
//     attributes: {
//         key: string;
//         value: string;
//     }[];
// }

// const CreateProduct: React.FC = () => {
//     const [product, setProduct] = useState<IProductFormState>({
//         name: '',
//         description: '',
//         brand: '',
//         category: '',
//         basePrice: '',
//         imageUrl: { file: null, preview: '' },
//         images: [],
//         stock: 0,
//         tags: '',
//         isFeatured: false,
//         status: "DRAFT",
//         variants: [],
//         attributes: [],
//     });

//     // Effect to clean up object URLs on component unmount to prevent memory leaks
//     useEffect(() => {
//         return () => {
//             if (product.imageUrl.preview) {
//                 URL.revokeObjectURL(product.imageUrl.preview);
//             }
//             product.images.forEach(image => {
//                 if (image.preview) {
//                     URL.revokeObjectURL(image.preview);
//                 }
//             });
//             product.variants.forEach(variant => {
//                 variant.images.forEach(image => {
//                     if (image.preview) {
//                         URL.revokeObjectURL(image.preview);
//                     }
//                 });
//             });
//         };
//     }, []); // Empty dependency array ensures this runs only on mount and unmount

//     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
//         const { name, value } = e.target;
//         setProduct(prev => ({ ...prev, [name]: value }));
//     };

//     const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const { name, checked } = e.target;
//         setProduct(prev => ({ ...prev, [name]: checked }));
//     };

//     const handleMainImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const file = e.target.files?.[0];
//         if (file) {
//             setProduct(prev => {
//                 if (prev.imageUrl.preview) {
//                     URL.revokeObjectURL(prev.imageUrl.preview);
//                 }
//                 const newPreview = URL.createObjectURL(file);
//                 return { ...prev, imageUrl: { file, preview: newPreview } };
//             });
//         }
//     };
    
//     const removeMainImage = () => {
//         setProduct(prev => {
//             if (prev.imageUrl.preview) {
//                 URL.revokeObjectURL(prev.imageUrl.preview);
//             }
//             return { ...prev, imageUrl: { file: null, preview: '' } };
//         });
//     };

//     const handleGalleryImageChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
//         const file = e.target.files?.[0];
//         if (file) {
//             const newImages = [...product.images];
//             if (newImages[index]?.preview) {
//                 URL.revokeObjectURL(newImages[index].preview);
//             }
//             const newPreview = URL.createObjectURL(file);
//             newImages[index] = { file, preview: newPreview };
//             setProduct(prev => ({ ...prev, images: newImages }));
//         }
//     };

//     const addGalleryImage = () => {
//         setProduct(prev => ({
//             ...prev,
//             images: [...prev.images, { file: null, preview: '' }]
//         }));
//     };

//     const removeGalleryImage = (index: number) => {
//         const newImages = [...product.images];
//         const imageToRemove = newImages[index];
//         if (imageToRemove.preview) {
//             URL.revokeObjectURL(imageToRemove.preview);
//         }
//         const filteredImages = newImages.filter((_, i) => i !== index);
//         setProduct(prev => ({ ...prev, images: filteredImages }));
//     };

//     const handleVariantChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
//         const { name, value } = e.target;
//         const newVariants = [...product.variants];
//         newVariants[index] = { ...newVariants[index], [name]: value };
//         setProduct(prev => ({ ...prev, variants: newVariants }));
//     };
    
//     const handleVariantAttributeChange = (vIndex: number, aIndex: number, e: React.ChangeEvent<HTMLInputElement>) => {
//         const { name, value } = e.target;
//         const newVariants = [...product.variants];
//         newVariants[vIndex].attributes[aIndex] = { ...newVariants[vIndex].attributes[aIndex], [name]: value };
//         setProduct(prev => ({ ...prev, variants: newVariants }));
//     };

//     const handleVariantImageChange = (vIndex: number, imgIndex: number, e: React.ChangeEvent<HTMLInputElement>) => {
//         const file = e.target.files?.[0];
//         if (file) {
//             const newVariants = [...product.variants];
//             if (newVariants[vIndex].images[imgIndex]?.preview) {
//                 URL.revokeObjectURL(newVariants[vIndex].images[imgIndex].preview);
//             }
//             const newPreview = URL.createObjectURL(file);
//             newVariants[vIndex].images[imgIndex] = { file, preview: newPreview };
//             setProduct(prev => ({ ...prev, variants: newVariants }));
//         }
//     };

//     const addVariantImage = (vIndex: number) => {
//         const newVariants = [...product.variants];
//         newVariants[vIndex].images.push({ file: null, preview: '' });
//         setProduct(prev => ({ ...prev, variants: newVariants }));
//     };

//     const removeVariantImage = (vIndex: number, imgIndex: number) => {
//         const newVariants = [...product.variants];
//         const imageToRemove = newVariants[vIndex].images[imgIndex];
//         if (imageToRemove.preview) {
//             URL.revokeObjectURL(imageToRemove.preview);
//         }
//         newVariants[vIndex].images = newVariants[vIndex].images.filter((_, i) => i !== imgIndex);
//         setProduct(prev => ({ ...prev, variants: newVariants }));
//     };


//     const addVariant = () => {
//         setProduct(prev => ({
//             ...prev,
//             variants: [...prev.variants, { sku: '', priceModifier: 0, stock: 0, attributes: [{ name: 'Color', value: '' }, { name: 'Size', value: '' }], images: [] }]
//         }));
//     };

//     const removeVariant = (index: number) => {
//         const variantToRemove = product.variants[index];
//         variantToRemove.images.forEach(image => {
//             if(image.preview) URL.revokeObjectURL(image.preview);
//         });
//         const newVariants = product.variants.filter((_, i) => i !== index);
//         setProduct(prev => ({ ...prev, variants: newVariants }));
//     };
    
//     const addAttribute = () => {
//         setProduct(prev => ({ ...prev, attributes: [...prev.attributes, {key: '', value: ''}] }));
//     };

//     const handleAttributeChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
//         const { name, value } = e.target;
//         const newAttributes = [...product.attributes];
//         newAttributes[index] = { ...newAttributes[index], [name]: value };
//         setProduct(prev => ({ ...prev, attributes: newAttributes }));
//     };

//     const removeAttribute = (index: number) => {
//         const newAttributes = product.attributes.filter((_, i) => i !== index);
//         setProduct(prev => ({ ...prev, attributes: newAttributes }));
//     };

//     const handleSubmit = (e: React.FormEvent) => {
//         e.preventDefault();
//         // NOTE: For a real application, you would use FormData to upload files.
//         // The `imageUrl.file` and `variants[...].images[...].file` contain the File objects.
//         const productForApi = {
//             ...product,
//             tags: product.tags.split(',').map(tag => tag.trim()).filter(Boolean),
//         };
//         console.log("Submitting Product:", productForApi);
//         alert('Product data including image files logged to console. Check the developer tools.');
//     };

//     const FormInput: React.FC<{label: string, name: string, value: any, onChange: any, type?: string, required?: boolean, placeholder?: string}> = 
//         ({ label, name, value, onChange, type = 'text', required = true, placeholder = '' }) => (
//         <div>
//             <label htmlFor={name} className="block text-sm font-medium text-gray-700">{label}</label>
//             <input
//                 type={type}
//                 id={name}
//                 name={name}
//                 value={value}
//                 onChange={onChange}
//                 required={required}
//                 placeholder={placeholder}
//                 className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//             />
//         </div>
//     );
    
//     return (
//         <main className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
//             <div className="bg-white shadow-lg rounded-lg p-8">
//                 <h1 className="text-3xl font-bold text-gray-900 mb-6">Create New Product</h1>
//                 <form onSubmit={handleSubmit} className="space-y-8">
//                     {/* Basic Information Section */}
//                     <div className="p-6 border border-gray-200 rounded-lg">
//                         <h2 className="text-xl font-semibold mb-4 text-gray-800">Basic Information</h2>
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                            <FormInput label="Product Name" name="name" value={product.name} onChange={handleInputChange} />
//                            <FormInput label="Brand" name="brand" value={product.brand} onChange={handleInputChange} />
//                            <div className="md:col-span-2">
//                                 <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
//                                 <textarea
//                                     id="description"
//                                     name="description"
//                                     value={product.description}
//                                     onChange={handleInputChange}
//                                     rows={4}
//                                     required
//                                     className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                                 />
//                             </div>
//                            <FormInput label="Category" name="category" value={product.category} onChange={handleInputChange} />
//                            <div>
//                                 <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
//                                 <select
//                                     id="status"
//                                     name="status"
//                                     value={product.status}
//                                     onChange={handleInputChange}
//                                     required
//                                     className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                                 >
//                                     <option value="DRAFT">Draft</option>
//                                     <option value="ACTIVE">Active</option>
//                                     <option value="INACTIVE">Inactive</option>
//                                     <option value="OUT OF STOCK">Out of Stock</option>
//                                 </select>
//                             </div>
//                            <FormInput label="Base Price ($)" name="basePrice" type="number" value={product.basePrice} onChange={handleInputChange} />
                           
//                            {/* Main Image Upload */}
//                            <div className="md:col-span-2">
//                                 <label className="block text-sm font-medium text-gray-700">Main Image (Thumbnail)</label>
//                                 <div className="mt-2 flex items-center space-x-4">
//                                     <div className="w-24 h-24 rounded-md bg-gray-100 flex items-center justify-center overflow-hidden">
//                                         {product.imageUrl.preview ? (
//                                             <img src={product.imageUrl.preview} alt="Main product" className="w-full h-full object-cover" />
//                                         ) : (
//                                             <span className="text-xs text-gray-500">Upload</span>
//                                         )}
//                                     </div>
//                                     <div className="flex flex-col space-y-2">
//                                         <input
//                                             type="file"
//                                             id="main-image"
//                                             accept="image/*"
//                                             onChange={handleMainImageChange}
//                                             className="hidden"
//                                         />
//                                         <label htmlFor="main-image" className="cursor-pointer bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50">
//                                             Upload File
//                                         </label>
//                                         {product.imageUrl.file && (
//                                             <button type="button" onClick={removeMainImage} className="text-sm text-red-600 hover:text-red-800">
//                                                 Remove
//                                             </button>
//                                         )}
//                                     </div>
//                                 </div>
//                            </div>

//                             {/* Gallery Images Upload */}
//                             <div className="md:col-span-2">
//                                 <label className="block text-sm font-medium text-gray-700">Gallery Images</label>
//                                 <div className="mt-2 flex flex-wrap gap-4">
//                                     {product.images.map((image, index) => (
//                                         <div key={index} className="flex flex-col items-center space-y-2">
//                                             <div className="w-24 h-24 rounded-md bg-gray-100 flex items-center justify-center overflow-hidden border border-gray-200">
//                                                 {image.preview ? (
//                                                     <img src={image.preview} alt={`Gallery ${index + 1}`} className="w-full h-full object-cover" />
//                                                 ) : (
//                                                     <span className="text-xs text-gray-500 text-center p-1">Upload Image</span>
//                                                 )}
//                                             </div>
//                                             <div className="flex items-center space-x-2">
//                                                 <input
//                                                     type="file"
//                                                     id={`gallery-image-${index}`}
//                                                     accept="image/*"
//                                                     onChange={(e) => handleGalleryImageChange(index, e)}
//                                                     className="hidden"
//                                                 />
//                                                 <label htmlFor={`gallery-image-${index}`} className="cursor-pointer bg-white py-1 px-2 border border-gray-300 rounded-md shadow-sm text-xs font-medium text-gray-700 hover:bg-gray-50">
//                                                     Choose File
//                                                 </label>
//                                                 <button type="button" onClick={() => removeGalleryImage(index)} className="text-red-500 hover:text-red-700 font-bold p-1 text-lg leading-none">&times;</button>
//                                             </div>
//                                         </div>
//                                     ))}
//                                 </div>
//                                 <button type="button" onClick={addGalleryImage} className="mt-4 text-sm text-indigo-600 hover:text-indigo-800 font-medium">
//                                     + Add Gallery Image
//                                 </button>
//                             </div>

//                            <FormInput label="Stock (if no variants)" name="stock" type="number" value={product.stock} onChange={handleInputChange} />
                           
//                            <div className="flex items-center justify-start md:pt-6">
//                                 <input
//                                     id="isFeatured"
//                                     name="isFeatured"
//                                     type="checkbox"
//                                     checked={product.isFeatured}
//                                     onChange={handleCheckboxChange}
//                                     className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
//                                 />
//                                 <label htmlFor="isFeatured" className="ml-3 block text-sm font-medium text-gray-700">
//                                     Featured Product
//                                 </label>
//                             </div>

//                            <div className="md:col-span-2">
//                                <FormInput 
//                                    label="Tags" 
//                                    name="tags" 
//                                    value={product.tags} 
//                                    onChange={handleInputChange} 
//                                    required={false}
//                                    placeholder="e.g. electronics, laptop, gaming"
//                                 />
//                                 <p className="text-xs text-gray-500 mt-1">Separate tags with a comma.</p>
//                            </div>
//                         </div>
//                     </div>

//                     {/* Variants Section */}
//                     <div className="p-6 border border-gray-200 rounded-lg">
//                          <h2 className="text-xl font-semibold mb-4 text-gray-800">Variants</h2>
//                          {product.variants.map((variant, vIndex) => (
//                              <div key={vIndex} className="p-4 border border-gray-200 rounded-md mb-4 relative">
//                                  <button type="button" onClick={() => removeVariant(vIndex)} className="absolute top-2 right-2 text-red-500 hover:text-red-700 font-bold">&times;</button>
//                                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                                      <FormInput label={`SKU #${vIndex + 1}`} name="sku" value={variant.sku} onChange={(e) => handleVariantChange(vIndex, e)} />
//                                      <FormInput label="Price Modifier" name="priceModifier" type="number" value={variant.priceModifier} onChange={(e) => handleVariantChange(vIndex, e)} />
//                                      <FormInput label="Stock" name="stock" type="number" value={variant.stock} onChange={(e) => handleVariantChange(vIndex, e)} />
//                                  </div>
//                                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
//                                      {variant.attributes.map((attr, aIndex) => (
//                                          <div key={aIndex} className="flex items-end space-x-2">
//                                             <FormInput label={`Attribute`} name="name" value={attr.name} onChange={(e) => handleVariantAttributeChange(vIndex, aIndex, e)} />
//                                             <FormInput label={`Value`} name="value" value={attr.value} onChange={(e) => handleVariantAttributeChange(vIndex, aIndex, e)} />
//                                          </div>
//                                      ))}
//                                  </div>

//                                  {/* Variant Images Section */}
//                                  <div className="mt-4 col-span-1 md:col-span-3">
//                                     <h4 className="text-sm font-medium text-gray-600 mb-2">Variant Images</h4>
//                                     {variant.images && variant.images.map((image, imgIndex) => (
//                                         <div key={imgIndex} className="flex items-center space-x-4 mb-2">
//                                             <div className="w-16 h-16 rounded-md bg-gray-100 flex items-center justify-center overflow-hidden">
//                                                 {image.preview ? (
//                                                     <img src={image.preview} alt={`Variant ${vIndex+1}`} className="w-full h-full object-cover" />
//                                                 ) : (
//                                                     <span className="text-xs text-gray-500">Upload</span>
//                                                 )}
//                                             </div>
//                                             <div className="flex flex-col">
//                                                 <input
//                                                     type="file"
//                                                     id={`variant-${vIndex}-image-${imgIndex}`}
//                                                     accept="image/*"
//                                                     onChange={(e) => handleVariantImageChange(vIndex, imgIndex, e)}
//                                                     className="hidden"
//                                                 />
//                                                 <label htmlFor={`variant-${vIndex}-image-${imgIndex}`} className="cursor-pointer bg-white py-1 px-2 border border-gray-300 rounded-md shadow-sm text-xs font-medium text-gray-700 hover:bg-gray-50">
//                                                     Upload
//                                                 </label>
//                                             </div>
//                                             <button type="button" onClick={() => removeVariantImage(vIndex, imgIndex)} className="text-red-500 hover:text-red-700 font-bold p-2 text-xl">&times;</button>
//                                         </div>
//                                     ))}
//                                     <button type="button" onClick={() => addVariantImage(vIndex)} className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">
//                                         + Add Image
//                                     </button>
//                                 </div>
//                              </div>
//                          ))}
//                          <button type="button" onClick={addVariant} className="mt-2 text-indigo-600 hover:text-indigo-800 font-medium">
//                              + Add Variant
//                          </button>
//                     </div>

//                     {/* General Attributes Section */}
//                     <div className="p-6 border border-gray-200 rounded-lg">
//                          <h2 className="text-xl font-semibold mb-4 text-gray-800">General Attributes</h2>
//                          {product.attributes.map((attr, index) => (
//                              <div key={index} className="flex items-center space-x-4 mb-2">
//                                  <FormInput label="Attribute Name" name="key" value={attr.key} onChange={(e) => handleAttributeChange(index, e)} />
//                                  <FormInput label="Value" name="value" value={attr.value} onChange={(e) => handleAttributeChange(index, e)} />
//                                  <button type="button" onClick={() => removeAttribute(index)} className="mt-5 text-red-500 hover:text-red-700 font-bold">&times;</button>
//                              </div>
//                          ))}
//                          <button type="button" onClick={addAttribute} className="mt-2 text-indigo-600 hover:text-indigo-800 font-medium">
//                              + Add Attribute
//                          </button>
//                     </div>

//                     <div className="flex justify-end">
//                         <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300">
//                             Create Product
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </main>
//     );
// };

// export default CreateProduct;

// "use client"

// import React, { useState, useEffect } from 'react';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Textarea } from '@/components/ui/textarea';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { Switch } from '@/components/ui/switch';
// import { Badge } from '@/components/ui/badge';
// import { Separator } from '@/components/ui/separator';
// import { FileUpload } from '@/components/ui/file-upload';
// import { Plus, Minus, Package, Image as ImageIcon, Tag, Settings, Save, Sparkles } from 'lucide-react';

// // Interface for managing image file and its preview URL
// interface ImageState {
//     file: File | null;
//     preview: string;
// }

// // Updated form state to handle image files
// interface IProductFormState {
//     name: string;
//     description: string;
//     brand: string;
//     category: string;
//     basePrice: number | string;
//     imageUrl: ImageState; // Corresponds to 'thumbnail' in the schema
//     images: ImageState[]; // Corresponds to 'images' array in the schema
//     stock: number | string;
//     tags: string;
//     isFeatured: boolean;
//     status: "ACTIVE" | "DRAFT" | "INACTIVE" | "OUT OF STOCK";
//     variants: {
//         sku: string;
//         priceModifier: number | string;
//         stock: number | string;
//         attributes: {
//             name: string;
//             value: string;
//         }[];
//         images: ImageState[]; // Changed from string[]
//     }[];
//     attributes: {
//         key: string;
//         value: string;
//     }[];
// }

// const CreateProduct: React.FC = () => {
//     const [product, setProduct] = useState<IProductFormState>({
//         name: '',
//         description: '',
//         brand: '',
//         category: '',
//         basePrice: '',
//         imageUrl: { file: null, preview: '' },
//         images: [],
//         stock: 0,
//         tags: '',
//         isFeatured: false,
//         status: "DRAFT",
//         variants: [],
//         attributes: [],
//     });

//     // Effect to clean up object URLs on component unmount to prevent memory leaks
//     useEffect(() => {
//         return () => {
//             if (product.imageUrl.preview) {
//                 URL.revokeObjectURL(product.imageUrl.preview);
//             }
//             product.images.forEach(image => {
//                 if (image.preview) {
//                     URL.revokeObjectURL(image.preview);
//                 }
//             });
//             product.variants.forEach(variant => {
//                 variant.images.forEach(image => {
//                     if (image.preview) {
//                         URL.revokeObjectURL(image.preview);
//                     }
//                 });
//             });
//         };
//     }, []); // Empty dependency array ensures this runs only on mount and unmount

//     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//         const { name, value } = e.target;
//         setProduct(prev => ({ ...prev, [name]: value }));
//     };

//     const handleSelectChange = (name: string, value: string) => {
//         setProduct(prev => ({ ...prev, [name]: value }));
//     };

//     const handleSwitchChange = (name: string, checked: boolean) => {
//         setProduct(prev => ({ ...prev, [name]: checked }));
//     };

//     const handleMainImageSelect = (file: File) => {
//         setProduct(prev => {
//             if (prev.imageUrl.preview) {
//                 URL.revokeObjectURL(prev.imageUrl.preview);
//             }
//             const newPreview = URL.createObjectURL(file);
//             return { ...prev, imageUrl: { file, preview: newPreview } };
//         });
//     };
    
//     const removeMainImage = () => {
//         setProduct(prev => {
//             if (prev.imageUrl.preview) {
//                 URL.revokeObjectURL(prev.imageUrl.preview);
//             }
//             return { ...prev, imageUrl: { file: null, preview: '' } };
//         });
//     };

//     const handleGalleryImageSelect = (index: number, file: File) => {
//         const newImages = [...product.images];
//         if (newImages[index]?.preview) {
//             URL.revokeObjectURL(newImages[index].preview);
//         }
//         const newPreview = URL.createObjectURL(file);
//         newImages[index] = { file, preview: newPreview };
//         setProduct(prev => ({ ...prev, images: newImages }));
//     };

//     const addGalleryImage = () => {
//         setProduct(prev => ({
//             ...prev,
//             images: [...prev.images, { file: null, preview: '' }]
//         }));
//     };

//     const removeGalleryImage = (index: number) => {
//         const newImages = [...product.images];
//         const imageToRemove = newImages[index];
//         if (imageToRemove.preview) {
//             URL.revokeObjectURL(imageToRemove.preview);
//         }
//         const filteredImages = newImages.filter((_, i) => i !== index);
//         setProduct(prev => ({ ...prev, images: filteredImages }));
//     };

//     const handleVariantChange = (index: number, field: string, value: string) => {
//         const newVariants = [...product.variants];
//         newVariants[index] = { ...newVariants[index], [field]: value };
//         setProduct(prev => ({ ...prev, variants: newVariants }));
//     };
    
//     const handleVariantAttributeChange = (vIndex: number, aIndex: number, field: string, value: string) => {
//         const newVariants = [...product.variants];
//         newVariants[vIndex].attributes[aIndex] = { ...newVariants[vIndex].attributes[aIndex], [field]: value };
//         setProduct(prev => ({ ...prev, variants: newVariants }));
//     };

//     const handleVariantImageSelect = (vIndex: number, imgIndex: number, file: File) => {
//         const newVariants = [...product.variants];
//         if (newVariants[vIndex].images[imgIndex]?.preview) {
//             URL.revokeObjectURL(newVariants[vIndex].images[imgIndex].preview);
//         }
//         const newPreview = URL.createObjectURL(file);
//         newVariants[vIndex].images[imgIndex] = { file, preview: newPreview };
//         setProduct(prev => ({ ...prev, variants: newVariants }));
//     };

//     const addVariantImage = (vIndex: number) => {
//         const newVariants = [...product.variants];
//         newVariants[vIndex].images.push({ file: null, preview: '' });
//         setProduct(prev => ({ ...prev, variants: newVariants }));
//     };

//     const removeVariantImage = (vIndex: number, imgIndex: number) => {
//         const newVariants = [...product.variants];
//         const imageToRemove = newVariants[vIndex].images[imgIndex];
//         if (imageToRemove.preview) {
//             URL.revokeObjectURL(imageToRemove.preview);
//         }
//         newVariants[vIndex].images = newVariants[vIndex].images.filter((_, i) => i !== imgIndex);
//         setProduct(prev => ({ ...prev, variants: newVariants }));
//     };

//     const addVariant = () => {
//         setProduct(prev => ({
//             ...prev,
//             variants: [...prev.variants, { 
//                 sku: '', 
//                 priceModifier: 0, 
//                 stock: 0, 
//                 attributes: [{ name: 'Color', value: '' }, { name: 'Size', value: '' }], 
//                 images: [] 
//             }]
//         }));
//     };

//     const removeVariant = (index: number) => {
//         const variantToRemove = product.variants[index];
//         variantToRemove.images.forEach(image => {
//             if(image.preview) URL.revokeObjectURL(image.preview);
//         });
//         const newVariants = product.variants.filter((_, i) => i !== index);
//         setProduct(prev => ({ ...prev, variants: newVariants }));
//     };
    
//     const addAttribute = () => {
//         setProduct(prev => ({ ...prev, attributes: [...prev.attributes, {key: '', value: ''}] }));
//     };

//     const handleAttributeChange = (index: number, field: string, value: string) => {
//         const newAttributes = [...product.attributes];
//         newAttributes[index] = { ...newAttributes[index], [field]: value };
//         setProduct(prev => ({ ...prev, attributes: newAttributes }));
//     };

//     const removeAttribute = (index: number) => {
//         const newAttributes = product.attributes.filter((_, i) => i !== index);
//         setProduct(prev => ({ ...prev, attributes: newAttributes }));
//     };

//     const handleSubmit = (e: React.FormEvent) => {
//         e.preventDefault();
//         // NOTE: For a real application, you would use FormData to upload files.
//         // The `imageUrl.file` and `variants[...].images[...].file` contain the File objects.
//         const productForApi = {
//             ...product,
//             tags: product.tags.split(',').map(tag => tag.trim()).filter(Boolean),
//         };
//         console.log("Submitting Product:", productForApi);
//         alert('Product data including image files logged to console. Check the developer tools.');
//     };

//     const getStatusColor = (status: string) => {
//         switch (status) {
//             case 'ACTIVE': return 'bg-green-100 text-green-800 border-green-200';
//             case 'DRAFT': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
//             case 'INACTIVE': return 'bg-gray-100 text-gray-800 border-gray-200';
//             case 'OUT OF STOCK': return 'bg-red-100 text-red-800 border-red-200';
//             default: return 'bg-gray-100 text-gray-800 border-gray-200';
//         }
//     };

//     return (
//         <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
//             {/* Header */}
//             <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 sticky top-0 z-10">
//                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
//                     <div className="flex items-center justify-between">
//                         <div className="flex items-center space-x-3">
//                             <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl">
//                                 <Package className="w-6 h-6 text-white" />
//                             </div>
//                             <div>
//                                 <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
//                                     Create New Product
//                                 </h1>
//                                 <p className="text-gray-600 mt-1">Add a new product to your inventory</p>
//                             </div>
//                         </div>
//                         <Badge className={`px-3 py-1 ${getStatusColor(product.status)}`}>
//                             {product.status}
//                         </Badge>
//                     </div>
//                 </div>
//             </div>

//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//                 <form onSubmit={handleSubmit} className="space-y-8">
//                     {/* Basic Information */}
//                     <Card className="shadow-xl bg-white/70 backdrop-blur-sm border-0 hover:shadow-2xl transition-all duration-300">
//                         <CardHeader className="pb-6">
//                             <div className="flex items-center space-x-3">
//                                 <div className="bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-lg">
//                                     <img src="/amazon-logo-png.webp" alt='amazon' className='w-[100px] object-cover' />
//                                 </div>
//                                 <div>
//                                     <CardTitle className="text-xl text-gray-900">Basic Information</CardTitle>
//                                     <CardDescription>Essential details about your product</CardDescription>
//                                 </div>
//                             </div>
//                         </CardHeader>
//                         <CardContent className="space-y-6">
//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                                 <div className="space-y-2">
//                                     <Label htmlFor="name" className="text-sm font-medium text-gray-700">Product Name</Label>
//                                     <Input
//                                         id="name"
//                                         name="name"
//                                         value={product.name}
//                                         onChange={handleInputChange}
//                                         placeholder="Enter product name"
//                                         className="border-gray-200 focus:border-blue-400 focus:ring-blue-400/20"
//                                         required
//                                     />
//                                 </div>
//                                 <div className="space-y-2">
//                                     <Label htmlFor="brand" className="text-sm font-medium text-gray-700">Brand</Label>
//                                     <Input
//                                         id="brand"
//                                         name="brand"
//                                         value={product.brand}
//                                         onChange={handleInputChange}
//                                         placeholder="Enter brand name"
//                                         className="border-gray-200 focus:border-blue-400 focus:ring-blue-400/20"
//                                         required
//                                     />
//                                 </div>
//                             </div>

//                             <div className="space-y-2">
//                                 <Label htmlFor="description" className="text-sm font-medium text-gray-700">Description</Label>
//                                 <Textarea
//                                     id="description"
//                                     name="description"
//                                     value={product.description}
//                                     onChange={handleInputChange}
//                                     placeholder="Describe your product in detail..."
//                                     rows={4}
//                                     className="border-gray-200 focus:border-blue-400 focus:ring-blue-400/20 resize-none"
//                                     required
//                                 />
//                             </div>

//                             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                                 <div className="space-y-2">
//                                     <Label htmlFor="category" className="text-sm font-medium text-gray-700">Category</Label>
//                                     <Input
//                                         id="category"
//                                         name="category"
//                                         value={product.category}
//                                         onChange={handleInputChange}
//                                         placeholder="Product category"
//                                         className="border-gray-200 focus:border-blue-400 focus:ring-blue-400/20"
//                                         required
//                                     />
//                                 </div>
//                                 <div className="space-y-2">
//                                     <Label htmlFor="basePrice" className="text-sm font-medium text-gray-700">Base Price ($)</Label>
//                                     <Input
//                                         id="basePrice"
//                                         name="basePrice"
//                                         type="number"
//                                         value={product.basePrice}
//                                         onChange={handleInputChange}
//                                         placeholder="0.00"
//                                         className="border-gray-200 focus:border-blue-400 focus:ring-blue-400/20"
//                                         required
//                                     />
//                                 </div>
//                                 <div className="space-y-2">
//                                     <Label htmlFor="status" className="text-sm font-medium text-gray-700">Status</Label>
//                                     <Select value={product.status} onValueChange={(value) => handleSelectChange('status', value)}>
//                                         <SelectTrigger className="border-gray-200 focus:border-blue-400 focus:ring-blue-400/20">
//                                             <SelectValue />
//                                         </SelectTrigger>
//                                         <SelectContent>
//                                             <SelectItem value="DRAFT">Draft</SelectItem>
//                                             <SelectItem value="ACTIVE">Active</SelectItem>
//                                             <SelectItem value="INACTIVE">Inactive</SelectItem>
//                                             <SelectItem value="OUT OF STOCK">Out of Stock</SelectItem>
//                                         </SelectContent>
//                                     </Select>
//                                 </div>
//                             </div>

//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                                 <div className="space-y-2">
//                                     <Label htmlFor="stock" className="text-sm font-medium text-gray-700">Stock Quantity</Label>
//                                     <Input
//                                         id="stock"
//                                         name="stock"
//                                         type="number"
//                                         value={product.stock}
//                                         onChange={handleInputChange}
//                                         placeholder="0"
//                                         className="border-gray-200 focus:border-blue-400 focus:ring-blue-400/20"
//                                     />
//                                 </div>
//                                 <div className="space-y-2">
//                                     <Label htmlFor="tags" className="text-sm font-medium text-gray-700">Tags</Label>
//                                     <Input
//                                         id="tags"
//                                         name="tags"
//                                         value={product.tags}
//                                         onChange={handleInputChange}
//                                         placeholder="electronics, laptop, gaming"
//                                         className="border-gray-200 focus:border-blue-400 focus:ring-blue-400/20"
//                                     />
//                                     <p className="text-xs text-gray-500">Separate tags with commas</p>
//                                 </div>
//                             </div>

//                             <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
//                                 <Switch
//                                     id="isFeatured"
//                                     checked={product.isFeatured}
//                                     onCheckedChange={(checked) => handleSwitchChange('isFeatured', checked)}
//                                 />
//                                 <div>
//                                     <Label htmlFor="isFeatured" className="text-sm font-medium text-gray-700 cursor-pointer">
//                                         Featured Product
//                                     </Label>
//                                     <p className="text-xs text-gray-500">Highlight this product on your store</p>
//                                 </div>
//                             </div>
//                         </CardContent>
//                     </Card>

//                     {/* Images Section */}
//                     <Card className="shadow-xl bg-white/70 backdrop-blur-sm border-0 hover:shadow-2xl transition-all duration-300">
//                         <CardHeader className="pb-6">
//                             <div className="flex items-center space-x-3">
//                                 <div className="p-2 bg-linear-to-br from-purple-400 to-purple-600 rounded-lg">
//                                     <ImageIcon className="w-5 h-5 text-white" />
//                                 </div>
//                                 <div>
//                                     <CardTitle className="text-xl text-gray-900">Product Images</CardTitle>
//                                     <CardDescription>Upload high-quality images of your product</CardDescription>
//                                 </div>
//                             </div>
//                         </CardHeader>
//                         <CardContent className="space-y-6">
//                             {/* Main Image */}
//                             <div className="space-y-3">
//                                 <Label className="text-sm font-medium text-gray-700">Main Product Image</Label>
//                                 <FileUpload
//                                     onFileSelect={handleMainImageSelect}
//                                     preview={product.imageUrl.preview}
//                                     onRemove={removeMainImage}
//                                     className="w-full"
//                                 />
//                             </div>

//                             <Separator />

//                             {/* Gallery Images */}
//                             <div className="space-y-4">
//                                 <div className="flex items-center justify-between">
//                                     <Label className="text-sm font-medium text-gray-700">Gallery Images</Label>
//                                     <Button
//                                         type="button"
//                                         variant="outline"
//                                         size="sm"
//                                         onClick={addGalleryImage}
//                                         className="text-blue-600 border-blue-200 hover:bg-blue-50"
//                                     >
//                                         <Plus className="w-4 h-4 mr-2" />
//                                         Add Image
//                                     </Button>
//                                 </div>
                                
//                                 {product.images.length > 0 && (
//                                     <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                                         {product.images.map((image, index) => (
//                                             <div key={index} className="relative group">
//                                                 <FileUpload
//                                                     onFileSelect={(file) => handleGalleryImageSelect(index, file)}
//                                                     preview={image.preview}
//                                                     onRemove={() => removeGalleryImage(index)}
//                                                 />
//                                             </div>
//                                         ))}
//                                     </div>
//                                 )}
//                             </div>
//                         </CardContent>
//                     </Card>

//                     {/* Variants Section */}
//                     <Card className="shadow-xl bg-white/70 backdrop-blur-sm border-0 hover:shadow-2xl transition-all duration-300">
//                         <CardHeader className="pb-6">
//                             <div className="flex items-center justify-between">
//                                 <div className="flex items-center space-x-3">
//                                     <div className="p-2 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg">
//                                         <Settings className="w-5 h-5 text-white" />
//                                     </div>
//                                     <div>
//                                         <CardTitle className="text-xl text-gray-900">Product Variants</CardTitle>
//                                         <CardDescription>Different versions of your product (size, color, etc.)</CardDescription>
//                                     </div>
//                                 </div>
//                                 <Button
//                                     type="button"
//                                     variant="outline"
//                                     onClick={addVariant}
//                                     className="text-orange-600 border-orange-200 hover:bg-orange-50"
//                                 >
//                                     <Plus className="w-4 h-4 mr-2" />
//                                     Add Variant
//                                 </Button>
//                             </div>
//                         </CardHeader>
//                         <CardContent>
//                             {product.variants.length === 0 ? (
//                                 <div className="text-center py-12 text-gray-500">
//                                     <Settings className="w-12 h-12 mx-auto mb-4 opacity-50" />
//                                     <p>No variants added yet. Click "Add Variant" to create different versions of your product.</p>
//                                 </div>
//                             ) : (
//                                 <div className="space-y-6">
//                                     {product.variants.map((variant, vIndex) => (
//                                         <Card key={vIndex} className="bg-gradient-to-br from-gray-50 to-white border border-gray-200">
//                                             <CardHeader className="pb-4">
//                                                 <div className="flex items-center justify-between">
//                                                     <CardTitle className="text-lg text-gray-800">Variant #{vIndex + 1}</CardTitle>
//                                                     <Button
//                                                         type="button"
//                                                         variant="ghost"
//                                                         size="sm"
//                                                         onClick={() => removeVariant(vIndex)}
//                                                         className="text-red-500 hover:text-red-700 hover:bg-red-50"
//                                                     >
//                                                         <Minus className="w-4 h-4" />
//                                                     </Button>
//                                                 </div>
//                                             </CardHeader>
//                                             <CardContent className="space-y-4">
//                                                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                                                     <div className="space-y-2">
//                                                         <Label className="text-sm font-medium text-gray-700">SKU</Label>
//                                                         <Input
//                                                             value={variant.sku}
//                                                             onChange={(e) => handleVariantChange(vIndex, 'sku', e.target.value)}
//                                                             placeholder="SKU-001"
//                                                             className="border-gray-200 focus:border-orange-400 focus:ring-orange-400/20"
//                                                         />
//                                                     </div>
//                                                     <div className="space-y-2">
//                                                         <Label className="text-sm font-medium text-gray-700">Price Modifier ($)</Label>
//                                                         <Input
//                                                             type="number"
//                                                             value={variant.priceModifier}
//                                                             onChange={(e) => handleVariantChange(vIndex, 'priceModifier', e.target.value)}
//                                                             placeholder="0.00"
//                                                             className="border-gray-200 focus:border-orange-400 focus:ring-orange-400/20"
//                                                         />
//                                                     </div>
//                                                     <div className="space-y-2">
//                                                         <Label className="text-sm font-medium text-gray-700">Stock</Label>
//                                                         <Input
//                                                             type="number"
//                                                             value={variant.stock}
//                                                             onChange={(e) => handleVariantChange(vIndex, 'stock', e.target.value)}
//                                                             placeholder="0"
//                                                             className="border-gray-200 focus:border-orange-400 focus:ring-orange-400/20"
//                                                         />
//                                                     </div>
//                                                 </div>

//                                                 <div className="space-y-3">
//                                                     <Label className="text-sm font-medium text-gray-700">Attributes</Label>
//                                                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                                         {variant.attributes.map((attr, aIndex) => (
//                                                             <div key={aIndex} className="flex space-x-2">
//                                                                 <Input
//                                                                     value={attr.name}
//                                                                     onChange={(e) => handleVariantAttributeChange(vIndex, aIndex, 'name', e.target.value)}
//                                                                     placeholder="Attribute name"
//                                                                     className="border-gray-200 focus:border-orange-400 focus:ring-orange-400/20"
//                                                                 />
//                                                                 <Input
//                                                                     value={attr.value}
//                                                                     onChange={(e) => handleVariantAttributeChange(vIndex, aIndex, 'value', e.target.value)}
//                                                                     placeholder="Value"
//                                                                     className="border-gray-200 focus:border-orange-400 focus:ring-orange-400/20"
//                                                                 />
//                                                             </div>
//                                                         ))}
//                                                     </div>
//                                                 </div>

//                                                 <div className="space-y-3">
//                                                     <div className="flex items-center justify-between">
//                                                         <Label className="text-sm font-medium text-gray-700">Variant Images</Label>
//                                                         <Button
//                                                             type="button"
//                                                             variant="outline"
//                                                             size="sm"
//                                                             onClick={() => addVariantImage(vIndex)}
//                                                             className="text-orange-600 border-orange-200 hover:bg-orange-50"
//                                                         >
//                                                             <Plus className="w-4 h-4 mr-2" />
//                                                             Add Image
//                                                         </Button>
//                                                     </div>
                                                    
//                                                     {variant.images.length > 0 && (
//                                                         <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
//                                                             {variant.images.map((image, imgIndex) => (
//                                                                 <FileUpload
//                                                                     key={imgIndex}
//                                                                     onFileSelect={(file) => handleVariantImageSelect(vIndex, imgIndex, file)}
//                                                                     preview={image.preview}
//                                                                     onRemove={() => removeVariantImage(vIndex, imgIndex)}
//                                                                     className="h-24"
//                                                                 />
//                                                             ))}
//                                                         </div>
//                                                     )}
//                                                 </div>
//                                             </CardContent>
//                                         </Card>
//                                     ))}
//                                 </div>
//                             )}
//                         </CardContent>
//                     </Card>

//                     {/* Attributes Section */}
//                     <Card className="shadow-xl bg-white/70 backdrop-blur-sm border-0 hover:shadow-2xl transition-all duration-300">
//                         <CardHeader className="pb-6">
//                             <div className="flex items-center justify-between">
//                                 <div className="flex items-center space-x-3">
//                                     <div className="p-2 bg-gradient-to-br from-teal-400 to-teal-600 rounded-lg">
//                                         <Tag className="w-5 h-5 text-white" />
//                                     </div>
//                                     <div>
//                                         <CardTitle className="text-xl text-gray-900">General Attributes</CardTitle>
//                                         <CardDescription>Additional properties and specifications</CardDescription>
//                                     </div>
//                                 </div>
//                                 <Button
//                                     type="button"
//                                     variant="outline"
//                                     onClick={addAttribute}
//                                     className="text-teal-600 border-teal-200 hover:bg-teal-50"
//                                 >
//                                     <Plus className="w-4 h-4 mr-2" />
//                                     Add Attribute
//                                 </Button>
//                             </div>
//                         </CardHeader>
//                         <CardContent>
//                             {product.attributes.length === 0 ? (
//                                 <div className="text-center py-12 text-gray-500">
//                                     <Tag className="w-12 h-12 mx-auto mb-4 opacity-50" />
//                                     <p>No attributes added yet. Click "Add Attribute" to include additional product specifications.</p>
//                                 </div>
//                             ) : (
//                                 <div className="space-y-4">
//                                     {product.attributes.map((attr, index) => (
//                                         <div key={index} className="flex items-center space-x-4 p-4 bg-gradient-to-r from-gray-50 to-white rounded-lg border border-gray-200">
//                                             <div className="flex-1">
//                                                 <Input
//                                                     value={attr.key}
//                                                     onChange={(e) => handleAttributeChange(index, 'key', e.target.value)}
//                                                     placeholder="Attribute name"
//                                                     className="border-gray-200 focus:border-teal-400 focus:ring-teal-400/20"
//                                                 />
//                                             </div>
//                                             <div className="flex-1">
//                                                 <Input
//                                                     value={attr.value}
//                                                     onChange={(e) => handleAttributeChange(index, 'value', e.target.value)}
//                                                     placeholder="Attribute value"
//                                                     className="border-gray-200 focus:border-teal-400 focus:ring-teal-400/20"
//                                                 />
//                                             </div>
//                                             <Button
//                                                 type="button"
//                                                 variant="ghost"
//                                                 size="sm"
//                                                 onClick={() => removeAttribute(index)}
//                                                 className="text-red-500 hover:text-red-700 hover:bg-red-50"
//                                             >
//                                                 <Minus className="w-4 h-4" />
//                                             </Button>
//                                         </div>
//                                     ))}
//                                 </div>
//                             )}
//                         </CardContent>
//                     </Card>

//                     {/* Submit Button */}
//                     <div className="flex justify-end pt-6">
//                         <Button
//                             type="submit"
//                             size="lg"
//                             className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-xl hover:shadow-2xl transition-all duration-300 px-8 py-3"
//                         >
//                             <Save className="w-5 h-5 mr-2" />
//                             Create Product
//                         </Button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default CreateProduct;

"use client"

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { FileUpload } from '@/components/ui/file-upload';
import { Plus, Minus, Package, Image as ImageIcon, Tag, Settings, Save, Sparkles } from 'lucide-react';

// Interface for managing image file and its preview URL
interface ImageState {
    file: File | null;
    preview: string;
}

// Updated form state to handle image files
interface IProductFormState {
    name: string;
    description: string;
    brand: string;
    category: string;
    basePrice: number | string;
    imageUrl: ImageState; // Corresponds to 'thumbnail' in the schema
    images: ImageState[]; // Corresponds to 'images' array in the schema
    stock: number | string;
    tags: string;
    isFeatured: boolean;
    status: "ACTIVE" | "DRAFT" | "INACTIVE" | "OUT OF STOCK";
    variants: {
        sku: string;
        priceModifier: number | string;
        stock: number | string;
        attributes: {
            name: string;
            value: string;
        }[];
        images: ImageState[]; // Changed from string[]
    }[];
    attributes: {
        key: string;
        value: string;
    }[];
}

const CreateProduct: React.FC = () => {
    const [product, setProduct] = useState<IProductFormState>({
        name: '',
        description: '',
        brand: '',
        category: '',
        basePrice: '',
        imageUrl: { file: null, preview: '' },
        images: [],
        stock: 0,
        tags: '',
        isFeatured: false,
        status: "DRAFT",
        variants: [],
        attributes: [],
    });

    // Effect to clean up object URLs on component unmount to prevent memory leaks
    useEffect(() => {
        return () => {
            if (product.imageUrl.preview) {
                URL.revokeObjectURL(product.imageUrl.preview);
            }
            product.images.forEach(image => {
                if (image.preview) {
                    URL.revokeObjectURL(image.preview);
                }
            });
            product.variants.forEach(variant => {
                variant.images.forEach(image => {
                    if (image.preview) {
                        URL.revokeObjectURL(image.preview);
                    }
                });
            });
        };
    }, []); // Empty dependency array ensures this runs only on mount and unmount

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProduct(prev => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (name: string, value: string) => {
        setProduct(prev => ({ ...prev, [name]: value }));
    };

    const handleSwitchChange = (checked: boolean) => {
        setProduct(prev => ({ ...prev, isFeatured: checked }));
    };

    const handleMainImageSelect = (file: File) => {
        setProduct(prev => {
            if (prev.imageUrl.preview) {
                URL.revokeObjectURL(prev.imageUrl.preview);
            }
            const newPreview = URL.createObjectURL(file);
            return { ...prev, imageUrl: { file, preview: newPreview } };
        });
    };
    
    const removeMainImage = () => {
        setProduct(prev => {
            if (prev.imageUrl.preview) {
                URL.revokeObjectURL(prev.imageUrl.preview);
            }
            return { ...prev, imageUrl: { file: null, preview: '' } };
        });
    };

    const handleGalleryImageSelect = (index: number, file: File) => {
        const newImages = [...product.images];
        if (newImages[index]?.preview) {
            URL.revokeObjectURL(newImages[index].preview);
        }
        const newPreview = URL.createObjectURL(file);
        newImages[index] = { file, preview: newPreview };
        setProduct(prev => ({ ...prev, images: newImages }));
    };

    const addGalleryImage = () => {
        setProduct(prev => ({
            ...prev,
            images: [...prev.images, { file: null, preview: '' }]
        }));
    };

    const removeGalleryImage = (index: number) => {
        const newImages = [...product.images];
        const imageToRemove = newImages[index];
        if (imageToRemove.preview) {
            URL.revokeObjectURL(imageToRemove.preview);
        }
        const filteredImages = newImages.filter((_, i) => i !== index);
        setProduct(prev => ({ ...prev, images: filteredImages }));
    };

    const handleVariantChange = (index: number, field: string, value: string) => {
        const newVariants = [...product.variants];
        newVariants[index] = { ...newVariants[index], [field]: value };
        setProduct(prev => ({ ...prev, variants: newVariants }));
    };
    
    const handleVariantAttributeChange = (vIndex: number, aIndex: number, field: string, value: string) => {
        const newVariants = [...product.variants];
        newVariants[vIndex].attributes[aIndex] = { ...newVariants[vIndex].attributes[aIndex], [field]: value };
        setProduct(prev => ({ ...prev, variants: newVariants }));
    };

    const handleVariantImageSelect = (vIndex: number, imgIndex: number, file: File) => {
        const newVariants = [...product.variants];
        if (newVariants[vIndex].images[imgIndex]?.preview) {
            URL.revokeObjectURL(newVariants[vIndex].images[imgIndex].preview);
        }
        const newPreview = URL.createObjectURL(file);
        newVariants[vIndex].images[imgIndex] = { file, preview: newPreview };
        setProduct(prev => ({ ...prev, variants: newVariants }));
    };

    const addVariantImage = (vIndex: number) => {
        const newVariants = [...product.variants];
        newVariants[vIndex].images.push({ file: null, preview: '' });
        setProduct(prev => ({ ...prev, variants: newVariants }));
    };

    const removeVariantImage = (vIndex: number, imgIndex: number) => {
        const newVariants = [...product.variants];
        const imageToRemove = newVariants[vIndex].images[imgIndex];
        if (imageToRemove.preview) {
            URL.revokeObjectURL(imageToRemove.preview);
        }
        newVariants[vIndex].images = newVariants[vIndex].images.filter((_, i) => i !== imgIndex);
        setProduct(prev => ({ ...prev, variants: newVariants }));
    };

    const addVariant = () => {
        setProduct(prev => ({
            ...prev,
            variants: [...prev.variants, { 
                sku: '', 
                priceModifier: 0, 
                stock: 0, 
                attributes: [{ name: 'Color', value: '' }, { name: 'Size', value: '' }], 
                images: [] 
            }]
        }));
    };

    const removeVariant = (index: number) => {
        const variantToRemove = product.variants[index];
        variantToRemove.images.forEach(image => {
            if(image.preview) URL.revokeObjectURL(image.preview);
        });
        const newVariants = product.variants.filter((_, i) => i !== index);
        setProduct(prev => ({ ...prev, variants: newVariants }));
    };
    
    const addAttribute = () => {
        setProduct(prev => ({ ...prev, attributes: [...prev.attributes, {key: '', value: ''}] }));
    };

    const handleAttributeChange = (index: number, field: string, value: string) => {
        const newAttributes = [...product.attributes];
        newAttributes[index] = { ...newAttributes[index], [field]: value };
        setProduct(prev => ({ ...prev, attributes: newAttributes }));
    };

    const removeAttribute = (index: number) => {
        const newAttributes = product.attributes.filter((_, i) => i !== index);
        setProduct(prev => ({ ...prev, attributes: newAttributes }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // NOTE: For a real application, you would use FormData to upload files.
        // The `imageUrl.file` and `variants[...].images[...].file` contain the File objects.
        const productForApi = {
            ...product,
            tags: product.tags.split(',').map(tag => tag.trim()).filter(Boolean),
        };
        console.log("Submitting Product:", productForApi);
        alert('Product data including image files logged to console. Check the developer tools.');
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'ACTIVE': return 'bg-green-100 text-green-800 border-green-200';
            case 'DRAFT': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'INACTIVE': return 'bg-gray-100 text-gray-800 border-gray-200';
            case 'OUT OF STOCK': return 'bg-red-100 text-red-800 border-red-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
            {/* Header */}
            <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl">
                                <Package className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                                    Create New Product
                                </h1>
                                <p className="text-gray-600 mt-1">Add a new product to your inventory</p>
                            </div>
                        </div>
                        <Badge className={`px-3 py-1 ${getStatusColor(product.status)}`}>
                            {product.status}
                        </Badge>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Basic Information */}
                    <Card className="shadow-xl bg-white/70 backdrop-blur-sm border-0 hover:shadow-2xl transition-all duration-300">
                        <CardHeader className="pb-6">
                            <div className="flex items-center space-x-3">
                                <div className="p-2 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-lg">
                                    <Sparkles className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <CardTitle className="text-xl text-gray-900">Basic Information</CardTitle>
                                    <CardDescription>Essential details about your product</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="name" className="text-sm font-medium text-gray-700">Product Name</Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        value={product.name}
                                        onChange={handleInputChange}
                                        placeholder="Enter product name"
                                        className="border-gray-200 focus:border-blue-400 focus:ring-blue-400/20"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="brand" className="text-sm font-medium text-gray-700">Brand</Label>
                                    <Input
                                        id="brand"
                                        name="brand"
                                        value={product.brand}
                                        onChange={handleInputChange}
                                        placeholder="Enter brand name"
                                        className="border-gray-200 focus:border-blue-400 focus:ring-blue-400/20"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description" className="text-sm font-medium text-gray-700">Description</Label>
                                <Textarea
                                    id="description"
                                    name="description"
                                    value={product.description}
                                    onChange={handleInputChange}
                                    placeholder="Describe your product in detail..."
                                    rows={4}
                                    className="border-gray-200 focus:border-blue-400 focus:ring-blue-400/20 resize-none"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="category" className="text-sm font-medium text-gray-700">Category</Label>
                                    <Input
                                        id="category"
                                        name="category"
                                        value={product.category}
                                        onChange={handleInputChange}
                                        placeholder="Product category"
                                        className="border-gray-200 focus:border-blue-400 focus:ring-blue-400/20"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="basePrice" className="text-sm font-medium text-gray-700">Base Price ($)</Label>
                                    <Input
                                        id="basePrice"
                                        name="basePrice"
                                        type="number"
                                        value={product.basePrice}
                                        onChange={handleInputChange}
                                        placeholder="0.00"
                                        className="border-gray-200 focus:border-blue-400 focus:ring-blue-400/20"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="status" className="text-sm font-medium text-gray-700">Status</Label>
                                    <Select value={product.status} onValueChange={(value) => handleSelectChange('status', value)}>
                                        <SelectTrigger className="border-gray-200 focus:border-blue-400 focus:ring-blue-400/20">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="DRAFT">Draft</SelectItem>
                                            <SelectItem value="ACTIVE">Active</SelectItem>
                                            <SelectItem value="INACTIVE">Inactive</SelectItem>
                                            <SelectItem value="OUT OF STOCK">Out of Stock</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="stock" className="text-sm font-medium text-gray-700">Stock Quantity</Label>
                                    <Input
                                        id="stock"
                                        name="stock"
                                        type="number"
                                        value={product.stock}
                                        onChange={handleInputChange}
                                        placeholder="0"
                                        className="border-gray-200 focus:border-blue-400 focus:ring-blue-400/20"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="tags" className="text-sm font-medium text-gray-700">Tags</Label>
                                    <Input
                                        id="tags"
                                        name="tags"
                                        value={product.tags}
                                        onChange={handleInputChange}
                                        placeholder="electronics, laptop, gaming"
                                        className="border-gray-200 focus:border-blue-400 focus:ring-blue-400/20"
                                    />
                                    <p className="text-xs text-gray-500">Separate tags with commas</p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
                                <Switch
                                    id="isFeatured"
                                    checked={product.isFeatured}
                                    onCheckedChange={handleSwitchChange}
                                />
                                <div>
                                    <Label htmlFor="isFeatured" className="text-sm font-medium text-gray-700 cursor-pointer">
                                        Featured Product
                                    </Label>
                                    <p className="text-xs text-gray-500">Highlight this product on your store</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Images Section */}
                    <Card className="shadow-xl bg-white/70 backdrop-blur-sm border-0 hover:shadow-2xl transition-all duration-300">
                        <CardHeader className="pb-6">
                            <div className="flex items-center space-x-3">
                                <div className="p-2 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg">
                                    <ImageIcon className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <CardTitle className="text-xl text-gray-900">Product Images</CardTitle>
                                    <CardDescription>Upload high-quality images of your product</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Main Image */}
                            <div className="space-y-3">
                                <Label className="text-sm font-medium text-gray-700">Main Product Image</Label>
                                <FileUpload
                                    onFileSelect={handleMainImageSelect}
                                    preview={product.imageUrl.preview}
                                    onRemove={removeMainImage}
                                    className="w-full"
                                />
                            </div>

                            <Separator />

                            {/* Gallery Images */}
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <Label className="text-sm font-medium text-gray-700">Gallery Images</Label>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={addGalleryImage}
                                        className="text-blue-600 border-blue-200 hover:bg-blue-50"
                                    >
                                        <Plus className="w-4 h-4 mr-2" />
                                        Add Image
                                    </Button>
                                </div>
                                
                                {product.images.length > 0 && (
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        {product.images.map((image, index) => (
                                            <div key={index} className="relative group">
                                                <FileUpload
                                                    onFileSelect={(file) => handleGalleryImageSelect(index, file)}
                                                    preview={image.preview}
                                                    onRemove={() => removeGalleryImage(index)}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Variants Section */}
                    <Card className="shadow-xl bg-white/70 backdrop-blur-sm border-0 hover:shadow-2xl transition-all duration-300">
                        <CardHeader className="pb-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className="p-2 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg">
                                        <Settings className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-xl text-gray-900">Product Variants</CardTitle>
                                        <CardDescription>Different versions of your product (size, color, etc.)</CardDescription>
                                    </div>
                                </div>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={addVariant}
                                    className="text-orange-600 border-orange-200 hover:bg-orange-50"
                                >
                                    <Plus className="w-4 h-4 mr-2" />
                                    Add Variant
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            {product.variants.length === 0 ? (
                                <div className="text-center py-12 text-gray-500">
                                    <Settings className="w-12 h-12 mx-auto mb-4 opacity-50" />
                                    <p>No variants added yet. Click "Add Variant" to create different versions of your product.</p>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    {product.variants.map((variant, vIndex) => (
                                        <Card key={vIndex} className="bg-gradient-to-br from-gray-50 to-white border border-gray-200">
                                            <CardHeader className="pb-4">
                                                <div className="flex items-center justify-between">
                                                    <CardTitle className="text-lg text-gray-800">Variant #{vIndex + 1}</CardTitle>
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => removeVariant(vIndex)}
                                                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                                    >
                                                        <Minus className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            </CardHeader>
                                            <CardContent className="space-y-4">
                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                    <div className="space-y-2">
                                                        <Label className="text-sm font-medium text-gray-700">SKU</Label>
                                                        <Input
                                                            value={variant.sku}
                                                            onChange={(e) => handleVariantChange(vIndex, 'sku', e.target.value)}
                                                            placeholder="SKU-001"
                                                            className="border-gray-200 focus:border-orange-400 focus:ring-orange-400/20"
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label className="text-sm font-medium text-gray-700">Price Modifier ($)</Label>
                                                        <Input
                                                            type="number"
                                                            value={variant.priceModifier}
                                                            onChange={(e) => handleVariantChange(vIndex, 'priceModifier', e.target.value)}
                                                            placeholder="0.00"
                                                            className="border-gray-200 focus:border-orange-400 focus:ring-orange-400/20"
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label className="text-sm font-medium text-gray-700">Stock</Label>
                                                        <Input
                                                            type="number"
                                                            value={variant.stock}
                                                            onChange={(e) => handleVariantChange(vIndex, 'stock', e.target.value)}
                                                            placeholder="0"
                                                            className="border-gray-200 focus:border-orange-400 focus:ring-orange-400/20"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="space-y-3">
                                                    <Label className="text-sm font-medium text-gray-700">Attributes</Label>
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                        {variant.attributes.map((attr, aIndex) => (
                                                            <div key={aIndex} className="flex space-x-2">
                                                                <Input
                                                                    value={attr.name}
                                                                    onChange={(e) => handleVariantAttributeChange(vIndex, aIndex, 'name', e.target.value)}
                                                                    placeholder="Attribute name"
                                                                    className="border-gray-200 focus:border-orange-400 focus:ring-orange-400/20"
                                                                />
                                                                <Input
                                                                    value={attr.value}
                                                                    onChange={(e) => handleVariantAttributeChange(vIndex, aIndex, 'value', e.target.value)}
                                                                    placeholder="Value"
                                                                    className="border-gray-200 focus:border-orange-400 focus:ring-orange-400/20"
                                                                />
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>

                                                <div className="space-y-3">
                                                    <div className="flex items-center justify-between">
                                                        <Label className="text-sm font-medium text-gray-700">Variant Images</Label>
                                                        <Button
                                                            type="button"
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() => addVariantImage(vIndex)}
                                                            className="text-orange-600 border-orange-200 hover:bg-orange-50"
                                                        >
                                                            <Plus className="w-4 h-4 mr-2" />
                                                            Add Image
                                                        </Button>
                                                    </div>
                                                    
                                                    {variant.images.length > 0 && (
                                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                                            {variant.images.map((image, imgIndex) => (
                                                                <FileUpload
                                                                    key={imgIndex}
                                                                    onFileSelect={(file) => handleVariantImageSelect(vIndex, imgIndex, file)}
                                                                    preview={image.preview}
                                                                    onRemove={() => removeVariantImage(vIndex, imgIndex)}
                                                                    className="h-24"
                                                                />
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Attributes Section */}
                    <Card className="shadow-xl bg-white/70 backdrop-blur-sm border-0 hover:shadow-2xl transition-all duration-300">
                        <CardHeader className="pb-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className="p-2 bg-gradient-to-br from-teal-400 to-teal-600 rounded-lg">
                                        <Tag className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-xl text-gray-900">General Attributes</CardTitle>
                                        <CardDescription>Additional properties and specifications</CardDescription>
                                    </div>
                                </div>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={addAttribute}
                                    className="text-teal-600 border-teal-200 hover:bg-teal-50"
                                >
                                    <Plus className="w-4 h-4 mr-2" />
                                    Add Attribute
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            {product.attributes.length === 0 ? (
                                <div className="text-center py-12 text-gray-500">
                                    <Tag className="w-12 h-12 mx-auto mb-4 opacity-50" />
                                    <p>No attributes added yet. Click "Add Attribute" to include additional product specifications.</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {product.attributes.map((attr, index) => (
                                        <div key={index} className="flex items-center space-x-4 p-4 bg-gradient-to-r from-gray-50 to-white rounded-lg border border-gray-200">
                                            <div className="flex-1">
                                                <Input
                                                    value={attr.key}
                                                    onChange={(e) => handleAttributeChange(index, 'key', e.target.value)}
                                                    placeholder="Attribute name"
                                                    className="border-gray-200 focus:border-teal-400 focus:ring-teal-400/20"
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <Input
                                                    value={attr.value}
                                                    onChange={(e) => handleAttributeChange(index, 'value', e.target.value)}
                                                    placeholder="Attribute value"
                                                    className="border-gray-200 focus:border-teal-400 focus:ring-teal-400/20"
                                                />
                                            </div>
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => removeAttribute(index)}
                                                className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                            >
                                                <Minus className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Submit Button */}
                    <div className="flex justify-end pt-6">
                        <Button
                            type="submit"
                            size="lg"
                            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-xl hover:shadow-2xl transition-all duration-300 px-8 py-3"
                        >
                            <Save className="w-5 h-5 mr-2" />
                            Create Product
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateProduct;