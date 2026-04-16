import { QueryBuilder } from "../../utils/QueryBuilders";
import { tourSearchableFields } from "./tour.constant";
import { ITour, ITourType } from "./tour.interface";
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



//  ------------------------- tour ---------------------------


const createTourService = async (payload: ITour) => {
    const existingTour = await Tour.findOne({ title: payload.title });
    if (existingTour) {
        throw new Error("A tour with this title already exists.");
    }

    const tour = await Tour.create(payload);
    return tour;

}

const updateTourService = async (id: string, payload: Partial<ITour>) => {
    const existingTour = await Tour.findById(id);
    if (!existingTour) {
        throw new Error("Tour not found.");
    }

    const updatedTour = await Tour.findByIdAndUpdate(id, payload, { new: true });
    return updatedTour;

}


const getAllToursService = async (query: Record<string, string>) => {

    const queryBuilder = new QueryBuilder(Tour.find(), query)

    const tours = await queryBuilder
        .search(tourSearchableFields)
        .filter()
        .sort()
        .fields()
        .paginate()

    // const meta = await queryBuilder.getMeta()

    const [data, meta] = await Promise.all([
        tours.build(),
        queryBuilder.getMeta()
    ])


    return {
        data,
        meta
    }

}


const deleteTour = async (id: string) => {
    return await Tour.findByIdAndDelete(id);
}


export const tourService = {
    createTourType,
    getAllTourType,
    updateTourTypes,
    deleteTourTypes,
    createTourService,
    updateTourService,
    getAllToursService,
    deleteTour
}

