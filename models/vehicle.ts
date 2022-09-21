export interface Vehicle {
  uuid?: string;
  information: Information;
  tuv: string;
  inspection: string;
  milage?: MilageItem[];
  todos?: TodoItem[];
  expenses?: ExpenseItem[];
  consumption?: ConsumptionItem[];
  images?: ImageItem[];
}

export interface Information {
  vehicleUuid?: string;
  type?: string;
  name: string;
  maker: string;
  model: string;
  licence: string;
  color: string;
  price?: string;
  hsn?: string;
  tsn?: string;
  manufactured: string;
  status?: string;
}

export interface MilageItem {
  uuid?: string;
  vehicleUuid?: string;
  value: string;
  timestamp?: string;
}

export interface TodoItem {
  uuid?: string;
  vehicleUuid?: string;
  name: string;
  isDone: boolean;
}

export interface ExpenseItem {
  uuid?: string;
  vehicleUuid?: string;
  name: string;
  value: string;
  timestamp?: string;
}

export interface ImageItem {
  uuid?: string;
  url: string;
  thumbUrl: string;
}

export interface ConsumptionItem {
  uuid?: string;
  vehicleUuid?: string;
  kilometers: string;
  liters: string;
  timestamp?: string;
}

export interface StatisticItem {
  distance: string;
  consumption: string;
  distanceByCar: string[];
  consumptionByCar: string[];
}
