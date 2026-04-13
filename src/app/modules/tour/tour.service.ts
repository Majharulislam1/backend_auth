import { ITourType } from "./tour.interface";
import { Tour, TourType } from "./tour.model";



const createTourType = async (payload: ITourType) => {

    const existingTourType = await TourType.findOne({ name: payload.name });

    if (existingTourType) {
        throw new Error("Tour type already exists.");
    }

    return await TourType.create({ name: payload.name });

}


const getAllTourType = async () => {
    const result = await TourType.find({});
    const totalTourType = await TourType.countDocuments();


    return {
        data: result,
        meta: {
            total: totalTourType
        }
    }
}


const updateTourTypes = async (id: string, payload: ITourType) => {
    const existingTourType = await TourType.findById(id);
    if (!existingTourType) {
        throw new Error("Tour type not found.");
    }

    const updatedTourType = await TourType.findByIdAndUpdate(id, payload, { new: true });
    return updatedTourType;
}


const deleteTourTypes = async (id: string) => {
    const existingTourType = await TourType.findById(id);
    if (!existingTourType) {
        throw new Error("Tour type not found.");
    }

     return await TourType.findByIdAndDelete(id);

}



export const tourService = {
    createTourType,
    getAllTourType,
    updateTourTypes,
    deleteTourTypes
}

