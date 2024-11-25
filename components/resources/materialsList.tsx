import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import { CiCircleInfo } from "react-icons/ci";
import React from "react";
import { MdEdit } from "react-icons/md";
import { BsDownload } from "react-icons/bs";
import getTextbooksByTopics from "@/lib/actions/textbooks/getTextbooksByTopics";
import Link from "next/link";
import { currentUser } from "@/lib/actions/authActions";

interface MaterialsListComponentProps {
  selectedTopicIds: string[];
  currentPage: number;
  pageSize: number;
  tag: "textbook" | "problembook";
}

const MaterialsListComponent = async ({
  selectedTopicIds,
  currentPage,
  pageSize,
  tag
}: MaterialsListComponentProps) => {
  const user = await currentUser();
  const { materials } = await getTextbooksByTopics(
    selectedTopicIds,
    tag,
    currentPage,
    pageSize
  );

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>название</TableHead>
          {user?.role == "ADMIN" && (
            <TableHead className="text-center w-5">edit</TableHead>
          )}
          <TableHead className="text-center w-10">скачать</TableHead>
          <TableHead className="text-center w-5 pr-3">инфо</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {materials.map((textbook) => (
          <TableRow key={textbook.id}>
            <TableCell>{textbook.name}</TableCell>
            {user?.role == "ADMIN" && (
              <TableCell className="w-5">
                <Link href={"/materials/" + textbook.id + "/edit"}>
                  <Button variant="ghost" size="icon">
                    <MdEdit />
                  </Button>
                </Link>
              </TableCell>
            )}
            <TableCell className="w-10 ">
              {textbook.filePath ? <Link href={textbook.filePath} download>
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-full text-center"
                >
                  <BsDownload />
                </Button>
              </Link> : (textbook.source && textbook.source.includes("http")) ? (
                (textbook.source.includes(".pdf") || textbook.source.includes(".doc") ? (
                <Link href={textbook.source} download>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-full text-center"
                  >
                    <BsDownload />
                  </Button>
                </Link> 
                ) : (
<Link href={textbook.source}>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-full text-center"
                  >
                    <BsDownload />
                  </Button>
                </Link> 
                ))
              ) : <Button
              variant="ghost"
              size="icon"
              className="w-full text-center"
              disabled
            >
              <BsDownload />
            </Button>}
              
            </TableCell>
            <TableCell className="w-5">
              <Link href={"/materials/" + textbook.id}>
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
