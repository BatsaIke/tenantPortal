import { IProperty, Property } from "../models/Property.js";

export const createProperty = async (propertyData: Omit<IProperty, '_id' | 'status' | 'commission' | 'createdAt'>, tenantId: string) => {
  const commission = calculateCommission(propertyData.price);
  const property = new Property({
    ...propertyData,
    tenantId,
    commission,
  });
  return await property.save();
};

const calculateCommission = (price: number): number => {
  if (price < 1000) return 10;
  if (price < 5000) return 8;
  return 5;
};

export const getPropertiesByTenant = async (tenantId: string) => {
  return await Property.find({ tenantId });
};