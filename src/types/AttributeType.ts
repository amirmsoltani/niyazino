export type AttributeType = {
  id: number;
  name: string;
  title: string;
  type: 'integer' | 'select' | 'text';
  is_required: boolean;
  is_filter: boolean;
  order: number | null;
  status: 'active' | 'pending' | 'rejected';
  create_at: string;
  options: AttributeOptionType[];
};

export type AttributeOptionType = {
  id: string;
  name: string;
  title: string;
  order: null | number;
  create_at: string;
  pivot: {
    attribute_id: number;
    option_id: number;
  };
};

export type ShowAttributeType = {
  id: number;
  advertisement_id: number;
  attribute_id: number;
  option_id: number;
  value: null | string;
  attribute: AttributeType;
  option?: AttributeOptionType;
};
