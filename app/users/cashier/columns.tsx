import ActionCell from './ActionCell'; // Adjust the import path as needed

export type user = {
  studentNo: string;
  name: string;
  program: string;
  year: string;
};

export const columns = [
  { name: 'STUDENT NO.', uid: 'studentNo', sortable: true },
  { name: 'NAME', uid: 'name', sortable: true },
  { name: 'PROGRAM', uid: 'program', sortable: true },
  { name: 'YEAR', uid: 'year', sortable: true },
  { name: 'ACTION', uid: 'CashierIsCleared', sortable: false },
];

export const renderCell = (users: user, columnKey: React.Key) => {
  const cellValue = users[columnKey as keyof user];

  switch (columnKey) {
    case 'studentNo':
      return (
        <div className="flex min-w-[100px] max-w-[150px] flex-col">
          <p className="text-bold text-small capitalize">{cellValue}</p>
        </div>
      );
    case 'name':
      return (
        <div className="flex min-w-[150px] max-w-[300px] flex-col">
          <p className="text-bold text-small capitalize">{cellValue}</p>
        </div>
      );
    case 'program':
      return (
        <div className="flex min-w-[50px] max-w-[100px] flex-col">
          <p className="text-bold text-small capitalize">{cellValue}</p>
        </div>
      );
    case 'year':
      return (
        <div className="flex min-w-[20px] max-w-[30px] flex-col">
          <p className="text-bold text-small capitalize">{cellValue}</p>
        </div>
      );
    case 'CashierIsCleared':
      return <ActionCell />;
    default:
      return cellValue;
  }
};
