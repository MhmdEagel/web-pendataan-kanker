"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";
import FilterDataForm from "./FilterDataForm";
import { useSearchParams } from "next/navigation";

export default function FilterData() {
  const searchParams = useSearchParams();
  const [isOpenFilter, setIsFilterOpen] = useState(searchParams.size > 0 ? true : false);
   console.log(searchParams.size) 

  return (
    <div>
      <Button
        onClick={() => setIsFilterOpen((prevValue) => !prevValue)}
        className="bg-primary hover:bg-primary/70  mb-4"
      >
        Filter Data {isOpenFilter ? <ChevronDown /> : <ChevronRight />}
      </Button>
      {isOpenFilter && (
        <Card className="mb-4">
          <CardContent>
            <FilterDataForm />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
