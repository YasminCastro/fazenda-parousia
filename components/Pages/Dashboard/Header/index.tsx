import { ComboboxHeader } from "./Combobox";

export default function Header() {
  return (
    <div className="flex items-center justify-between">
      <div className="flex space-x-4">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <ComboboxHeader />
      </div>
      <div className="text-sm text-gray-600">preço do leite (R$/kg)</div>
    </div>
  );
}
