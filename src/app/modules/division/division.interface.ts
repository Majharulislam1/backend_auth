import { Document } from "mongoose";

export interface IDivision extends Document {
    name: string;
    slug: string;
    thumbnail?: string;
    description?: string
}

/**
 * division name = Chattogram Division
 * 
 * slug = chattogram-division
 * 
 * /:id => /efwl432qgyqahwe
 * 
 * /:id => 
 * 
 * /:slug => /division/chattogram-division
 * 
 */