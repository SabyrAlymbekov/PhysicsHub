import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { Button } from '../ui/button';
import { CiCircleInfo } from 'react-icons/ci';
import React from 'react';
import { MdEdit } from "react-icons/md";
import { BsDownload } from "react-icons/bs";
import getTextbooksByTopics from '@/lib/actions/textbooks/getTextbooksByTopics';
import Link from 'next/link';

interface MaterialsListComponentProps {
  selectedTopicIds: string[],
  currentPage: number,
  pageSize: number
}

const MaterialsListComponent = async ({
  selectedTopicIds, currentPage, pageSize
}: MaterialsListComponentProps) => {
  const { textbooks } = await getTextbooksByTopics(selectedTopicIds, currentPage, pageSize);
  
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>название</TableHead>
          <TableHead className="text-center w-5">edit</TableHead>
          <TableHead className="text-center w-10">скачать</TableHead>
          <TableHead className="text-center w-5 pr-3">инфо</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {textbooks.map((textbook) => (
          <TableRow key={textbook.id}>
            <TableCell>{textbook.name}</TableCell>
            <TableCell className="w-5">
            <Link href={"/materials/"+textbook.id+"/edit"}>
              <Button variant="ghost" size="icon">
                <MdEdit />
              </Button>
              </Link>
            </TableCell>
            <TableCell className="w-10 ">
              <Link href={textbook.filePath} download>
              <Button variant="ghost" size="icon" className='w-full text-center'>
              <BsDownload />
              </Button>
              </Link>
            </TableCell>
            <TableCell className="w-5">
              <Link href={"/materials/"+textbook.id}>
              <Button variant="ghost" size="icon">
                <CiCircleInfo />
              </Button>
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default React.memo(MaterialsListComponent);