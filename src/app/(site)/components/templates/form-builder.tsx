"use client";
import { useEffect, useState } from "react";
import { submitForm } from "./_formActions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { format } from 'date-fns';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ContentEditor from "../util/content-editor";
import { FormField, FormBuilderProps } from "@/lib/types";
import { usePathname } from "next/navigation";
import { DatePicker } from "@/components/ui/date-picker";



export default function FormBuilder({ formSchema, labelColor }: FormBuilderProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const path = usePathname();
  const [fullPath, setFullPath] = useState("");
  const [selectedDates, setSelectedDates] = useState<{ [key: string]: Date | undefined }>({});


  useEffect(() => {
    if (typeof window !== "undefined") {
      const url = `${window.location.origin}${path}`;
      setFullPath(url);
    }
  }, [path]);

  const renderField = (field: FormField, index: number) => {
    // Early return for static description text (non-input)
    if (field.type === "description") {
      return (
        <div key={field._key} className="col-span-4 py-2">
          <p className="whitespace-pre-line mt-6">
            {field.descriptionText}
          </p>
        </div>
      );
    }



    const commonProps = {
      id: `${field._key}-${index}`,
      name: field.label,
      placeholder:
        (!field.hideLabel && field.placeholder) ||
        (field.hideLabel && field.required
          ? `${field.placeholder || field.label} *`
          : field.placeholder || field.label),
      required: field.required,
    };
    

    const fieldComponents = {
      text: <Input type="text" {...commonProps} />,
      email: <Input type="email" {...commonProps} />,
      phone: <Input type="tel" {...commonProps} />,
      file: <Input type="file" {...commonProps} />,
      textarea: <Textarea {...commonProps} />,
      date: (
        <div className="space-y-2">
          <DatePicker
            date={selectedDates?.[commonProps.name]}
            label={commonProps.name}
            onChange={(date) => {
              setSelectedDates((prev) => ({
                ...prev,
                [commonProps.name]: date,
              }));
            }}
          />
          <input
            type="hidden"
            name={commonProps.name}
            value={
              selectedDates?.[commonProps.name]
                ? format(selectedDates[commonProps.name] as Date, 'MM/dd/yyyy')
                : ''
            }
          />
        </div>
      ),

      radio: (
        <RadioGroup {...commonProps}>
          {field.radioValue?.map((value, i) => (
            <div key={i} className="flex items-center space-x-2">
              <RadioGroupItem value={value} id={`${commonProps.id}-${i}`} />
              <Label htmlFor={`${commonProps.id}-${i}`}>{value}</Label>
            </div>
          ))}
        </RadioGroup>
      ),
      checkbox: (
        <div className="space-y-2">
          {field.checkBoxValue?.map((value, i) => (
            <div key={i} className="flex items-center space-x-2">
              <Checkbox id={`${commonProps.id}-${i}`} name={commonProps.name} />
              <Label htmlFor={`${commonProps.id}-${i}`}>{value}</Label>
            </div>
          ))}
        </div>
      ),
      select: (
        <Select>
          <SelectTrigger>
            <SelectValue placeholder={field.placeholder || field.label} />
          </SelectTrigger>
          <SelectContent>
            {field.selectValue?.map((value, i) => (
              <SelectItem key={i} value={value}>
                {value}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ),
    };

    return (
      <div
        key={field._key}
        className={`${field.half ? "col-span-2" : "col-span-4"} space-y-2`}
      >
        {!field.hideLabel && (
          <Label htmlFor={commonProps.id} style={{ color: labelColor }}>
            {field.label}
            {field.required && <span className="text-red-500">*</span>}
          </Label>
        )}
        {fieldComponents[field.type as keyof typeof fieldComponents]}
      </div>
    );
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    const formData = new FormData(event.currentTarget);

    try {
      await submitForm(formData, formSchema?.spreadsheetId, formSchema?.sheetName);
      // handle success (e.g., show confirmation or redirect)
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-2">
      <form onSubmit={handleSubmit}>
        <input type="hidden" name="name-honey" />
        <input type="hidden" name="bcc" value={formSchema?.emailBcc} />
        <input type="hidden" name="cc" value={formSchema?.emailCc} />
        <input
          type="hidden"
          name="sendFrom"
          value={formSchema?.sendFrom || "forms@hungryramwebdesign.com"}
        />
        <input type="hidden" name="sendTo" value={formSchema?.sendTo} />
        <input type="hidden" name="subject" value={formSchema?.subject} />
        <input type="hidden" name="redirectTo" value={formSchema?.redirectTo} />
        <input type="hidden" name="fullPath" value={fullPath} />

        <div className="grid grid-cols-4 gap-4">
          {formSchema?.fields?.map(renderField)}
        </div>

        {formSchema?.formDisclaimer && (
          <div className="mt-6 text-xs">
            <ContentEditor content={formSchema.formDisclaimer} />
          </div>
        )}

        <div className="mt-6">
          <Button
            type="submit"
            disabled={isSubmitting}
            variant="secondary"
            style={{
              backgroundColor: formSchema?.buttonBackgroundColor?.hex,
              color: formSchema?.buttonTextColor?.hex,
            }}
          >
            {isSubmitting ? "Submitting..." : formSchema?.buttonLabel || "SUBMIT"}
          </Button>
        </div>
      </form>
    </div>
  );
}
