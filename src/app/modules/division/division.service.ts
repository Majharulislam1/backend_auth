import { IDivision } from "./division.interface"
import { Division } from "./division.model"




const createDivisionService = async (payload: IDivision) => {


    const existingDivision = await Division.findOne({ name: payload.name });

    if (existingDivision) {
        throw new Error("A division with this name already exists.");
    }

    const division = await Division.create(payload);
    return division;

}



const getAllDivision = async () => {

    const divisions = await Division.find({});
    const totalDivision = await Division.countDocuments();


    return {
        data: divisions,
        meta: {
            total: totalDivision
        }
    }
}


const getSingleDivision = async (id: string) => {

    const division = await Division.findById(id);

    return {
         data:division
    }

}







export const divisionService = {
    createDivisionService,
    getAllDivision,
    getSingleDivision
}