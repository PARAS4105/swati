"use client";

import { PropertyListContext } from './PropertyListContext';
import { useState } from 'react';

export default function PropertyListProvider({ children, propertylist , completedPropertylist }) {
  return (
    <PropertyListContext.Provider value={{ propertylist, completedPropertylist }}>
      {children}
    </PropertyListContext.Provider>
  );
}
