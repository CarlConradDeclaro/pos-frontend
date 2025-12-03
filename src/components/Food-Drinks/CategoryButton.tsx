interface CategoryButtonProps {
  name: string;
  isActive: boolean;
  onClickFunc: (categoryName: string) => void;
};

const CategoryButon = ({ name, isActive, onClickFunc }: CategoryButtonProps) => {
  return (

    <button
      className={`px-4 py-2 text-sm font-medium ${isActive ? 'text-green-500 bg-green-100 hover:border-green-500' : 'text-gray-700 bg-white hover:bg-green-100 hover:border-green-500 '} rounded-2xl transition-colors`}
      onClick={() => {
        onClickFunc(name);
      }}
    >
      {name}
    </button>
  );
}

export default CategoryButon;
