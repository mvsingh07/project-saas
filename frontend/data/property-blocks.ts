import type { PropertyBlock } from "@/types/property-block"
import { properties } from "./properties"

export const propertyBlocks: PropertyBlock[] = [
  {
    id: "block-001",
    name: "Sunset Heights",
    regionId: "region-001",
    area: 25000,
    areaUnit: "sq.ft",
    numberOfPlots: 15,
    averagePlotSize: 1667,
    location: {
      city: "Mumbai",
      state: "Maharashtra",
      coordinates: {
        latitude: 19.076,
        longitude: 72.8777,
      },
    },
    status: "Active",
    plotsAvailability: 60, // 60% available
    mapLink: "https://maps.google.com/?q=19.0760,72.8777",
    description: "Premium residential plots with sea view in North Mumbai",
    properties: properties.slice(0, 3).map((p) => p.id),
    customAttributes: {
      zoning: "Residential",
      soilType: "Alluvial",
      waterSource: "Municipal",
      electricity: "24/7 Supply",
    },
  },
  {
    id: "block-002",
    name: "Green Valley",
    regionId: "region-001",
    area: 40000,
    areaUnit: "sq.ft",
    numberOfPlots: 25,
    averagePlotSize: 1600,
    location: {
      city: "Pune",
      state: "Maharashtra",
      coordinates: {
        latitude: 18.5204,
        longitude: 73.8567,
      },
    },
    status: "Active",
    plotsAvailability: 40, // 40% available
    mapLink: "https://maps.google.com/?q=18.5204,73.8567",
    description: "Eco-friendly residential plots surrounded by greenery",
    properties: properties.slice(3, 6).map((p) => p.id),
    customAttributes: {
      zoning: "Residential",
      soilType: "Black Cotton",
      waterSource: "Borewell",
      electricity: "Solar Backup",
    },
  },
  {
    id: "block-003",
    name: "Tech Park",
    regionId: "region-002",
    area: 100000,
    areaUnit: "sq.ft",
    numberOfPlots: 10,
    averagePlotSize: 10000,
    location: {
      city: "Bangalore",
      state: "Karnataka",
      coordinates: {
        latitude: 12.9716,
        longitude: 77.5946,
      },
    },
    status: "Under Development",
    plotsAvailability: 100, // 100% available
    mapLink: "https://maps.google.com/?q=12.9716,77.5946",
    description: "Commercial plots ideal for IT companies and startups",
    properties: properties.slice(6, 8).map((p) => p.id),
    customAttributes: {
      zoning: "Commercial",
      soilType: "Red Soil",
      waterSource: "Municipal + Rainwater Harvesting",
      electricity: "Uninterrupted Supply with Backup",
    },
  },
  {
    id: "block-004",
    name: "Riverside Estates",
    regionId: "region-003",
    area: 50000,
    areaUnit: "sq.ft",
    numberOfPlots: 20,
    averagePlotSize: 2500,
    location: {
      city: "Kolkata",
      state: "West Bengal",
      coordinates: {
        latitude: 22.5726,
        longitude: 88.3639,
      },
    },
    status: "Sold Out",
    plotsAvailability: 0, // 0% available
    mapLink: "https://maps.google.com/?q=22.5726,88.3639",
    description: "Premium plots with river view, all sold out",
    properties: [],
    customAttributes: {
      zoning: "Residential",
      soilType: "Alluvial",
      waterSource: "River + Municipal",
      electricity: "24/7 Supply",
    },
  },
  {
    id: "block-005",
    name: "Coastal Haven",
    regionId: "region-004",
    area: 35000,
    areaUnit: "sq.ft",
    numberOfPlots: 18,
    averagePlotSize: 1944,
    location: {
      city: "Ahmedabad",
      state: "Gujarat",
      coordinates: {
        latitude: 23.0225,
        longitude: 72.5714,
      },
    },
    status: "Active",
    plotsAvailability: 30, // 30% available
    mapLink: "https://maps.google.com/?q=23.0225,72.5714",
    description: "Residential plots with modern amenities",
    properties: [],
    customAttributes: {
      zoning: "Mixed Use",
      soilType: "Sandy",
      waterSource: "Municipal",
      electricity: "24/7 with Solar Options",
    },
  },
  {
    id: "block-006",
    name: "Heritage Gardens",
    regionId: "region-005",
    area: 60000,
    areaUnit: "sq.ft",
    numberOfPlots: 30,
    averagePlotSize: 2000,
    location: {
      city: "Indore",
      state: "Madhya Pradesh",
      coordinates: {
        latitude: 22.7196,
        longitude: 75.8577,
      },
    },
    status: "On Hold",
    plotsAvailability: 80, // 80% available
    mapLink: "https://maps.google.com/?q=22.7196,75.8577",
    description: "Residential plots near historical sites, project currently on hold",
    properties: [],
    customAttributes: {
      zoning: "Residential",
      soilType: "Black Cotton",
      waterSource: "Municipal + Borewell",
      electricity: "Regular Supply",
    },
  },
]
