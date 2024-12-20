import React, { useContext } from 'react';
import HelmetAsync from '../../../../components/HelmetAsync/HelmetAsync';
import AddCarousel from '../../../../components/AddCarousel/AddCarousel';
import { RiAddBoxFill, RiDeleteBin2Fill } from 'react-icons/ri';
import SearchProducts from '../../../../components/SearchProducts/SearchProducts';
import CarouselLists from '../../../../components/CarouselLists/CarouselLists';
import { CarouselContext } from '../../../../providers/CarouselProvider';
import useCarousels from '../../../../hooks/useCarousels';
import Swal from 'sweetalert2';

const ManageCarousels = () => {

    const { selectedCarousels, setSelectedCarousels, deleteCarousels } = useContext(CarouselContext);
    const { isCarouselsLoading, carousels, refetchCarousels, isCarouselsError, carouselsError } = useCarousels();

    const handleDeleteCarousels = async () => {
        try {
            await deleteCarousels()
                .then(({ data }) => {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Deleted Successfully !!",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    setSelectedCarousels([]);
                    refetchCarousels();
                })
                .catch((err) => {
                    Swal.fire({
                        position: "center",
                        icon: "error",
                        title: `${err.message}`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                })
        } catch (err) {
            Swal.fire({
                position: "center",
                icon: "error",
                title: `${err.message}`,
                showConfirmButton: false,
                timer: 1500
            });
        }
    };

    return (
        <div>
            <div>
                <HelmetAsync title={"Carousels"} />
                <div>
                    <div className="mx-auto sm:w-6/12 divider divider-success"><h3 className="px-4 pt-1 pb-2 text-2xl font-bold text-white bg-success">Manage Carousels</h3></div>
                </div>
                <br /><br />
                <div className="items-center justify-around gap-5 text-center md:flex">
                    <div>
                        <button onClick={() => document.getElementById('add_carousel_modal').showModal()} className="btn btn-outline btn-info"><RiAddBoxFill className="text-2xl" />Carousel</button>
                    </div>
                    {/* <div className="mt-5 md:mt-0">
                        <SearchProducts />
                    </div> */}
                    <div className="mt-5 md:mt-0">
                        <button disabled={selectedCarousels?.length === 0} onClick={handleDeleteCarousels} className="btn btn-outline btn-error"><RiDeleteBin2Fill className="text-2xl" />Carousel</button>
                    </div>
                </div>
                <br />
                <AddCarousel />
                <br />
                <div>
                    <CarouselLists />
                </div>
            </div>
        </div>
    );
};

export default ManageCarousels;