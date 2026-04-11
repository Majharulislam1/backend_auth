import { CallbackWithoutResultAndOptionalError, model,   Schema } from "mongoose";
import { IDivision } from "./division.interface";



const divisionSchema = new Schema<IDivision>({

    name: { type: String, required: true, unique: true },
    slug: { type: String, unique: true },
    thumbnail: { type: String },
    description: { type: String }

}, {
    timestamps: true
})


divisionSchema.pre<IDivision>("save", async function (this:IDivision) {

    if (this.isModified("name")) {
        const baseSlug = `${this.name.toLowerCase().split(" ").join("-")}-division`;

        let slug = baseSlug;
        let counter = 1;

         
        while (await Division.exists({ slug, _id: { $ne: this._id } })) {
            slug = `${baseSlug}-${counter++}`;
        }

        this.slug = slug;
    }

    
});
 

 




export const Division = model<IDivision>("Division",divisionSchema);