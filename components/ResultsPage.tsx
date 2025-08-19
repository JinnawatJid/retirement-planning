'use client';

import WrappedResult from './WrappedResult';

interface FormData {
  name: string;
  avatar: string;
  startAge: number;
  salary: number;
  monthlySavings: number;
  retireAge: number;
  monthlyExpense: number;
  lifeExpectancy: number;
}

interface ResultsPageProps {
  data: FormData;
  onClose: () => void;
}

export default function ResultsPage({ data, onClose }: ResultsPageProps) {
  return (
    <WrappedResult
      data={data}
      onClose={onClose}
    />
  );
}