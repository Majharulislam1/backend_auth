import {  model,   Schema } from "mongoose";
import { IDivision } from "./division.interface";



const divisionSchema = new Schema<IDivision>({

    name: { type: String, required: true, unique: true },
    slug: { type: String, unique: true },
    thumbnail: { type: String },
    description: { type: String }

},
{
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
 


 
 

divisionSchema.pre("findOneAndUpdate", async function () {
    const update = this.getUpdate() as { $set?: Partial<IDivision> } & Partial<IDivision>;

    // Handle both { name: "..." } and { $set: { name: "..." } }
    const name = update?.$set?.name || update?.name;

    if (name) {
        const baseSlug = `${name.toLowerCase().split(" ").join("-")}-division`;

        let slug = baseSlug;
        let counter = 1;

        // Get the _id of the document being updated to exclude it
        const filter = this.getFilter();

        while (await Division.exists({ slug, _id: { $ne: filter._id } })) {
            slug = `${baseSlug}-${counter++}`;
        }

        // Set slug in the correct place
        if (update.$set) {
            update.$set.slug = slug;
        } else {
            update.slug = slug;
        }

        this.setUpdate(update);
    }
});




export const Division = model<IDivision>("Division",divisionSchema);