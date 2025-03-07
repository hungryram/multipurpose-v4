"use client"
import { useState } from "react";
import { submitForm } from "./_formActions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ContentEditor from "../util/content-editor";
import { FormField, FormBuilderProps } from "@/lib/types";

export default function FormBuilder({ formSchema, labelColor }: FormBuilderProps) {
  const [isSubmitting, setIsSubmitting] = useState(false); // Track form submission state

  const renderField = (field: FormField, index: number) => {
    const commonProps = {
      id: `${field._key}-${index}`,
      name: field.label,
      placeholder: field?.placeholder,
      required: field.required,
    };

    const fieldComponents = {
      text: <Input type="text" {...commonProps} />,
      date: <Input type="date" {...commonProps} />,
      email: <Input type="email" {...commonProps} />,
      phone: <Input type="tel" {...commonProps} />,
      file: <Input type="file" {...commonProps} />,
      textarea: <Textarea {...commonProps} />,
      radio: (
        <RadioGroup>
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
              <Checkbox id={`${commonProps.id}-${i}`} />
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
      <div key={field._key} className={`${field.half ? "col-span-2" : "col-span-4"} space-y-2`}>
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
    if (isSubmitting) return; // Prevent multiple submissions

    setIsSubmitting(true); // Set loading state
    const formData = new FormData(event.currentTarget);

    try {
      await submitForm(formData, formSchema?.spreadsheetId, formSchema?.sheetName);
      // Handle success (e.g., show a success message, redirect)
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false); // Reset button state
    }
  };

  return (
    <div className="py-2">
      <form onSubmit={handleSubmit}>
        <input type="hidden" name="name-honey" />
        <input type="hidden" name="bcc" value={formSchema?.emailBcc} />
        <input type="hidden" name="cc" value={formSchema?.emailCc} />
        <input type="hidden" name="sendFrom" value={formSchema?.sendFrom || "forms@hungryramwebdesign.com"} />
        <input type="hidden" name="sendTo" value={formSchema?.sendTo} />
        <input type="hidden" name="subject" value={formSchema?.subject} />
        <input type="hidden" name="redirectTo" value={formSchema?.redirectTo} />

        <div className="grid grid-cols-4 gap-4">{formSchema?.fields?.map(renderField)}</div>

        {formSchema?.formDisclaimer && (
          <div className="mt-6 text-xs">
            <ContentEditor content={formSchema.formDisclaimer} />
          </div>
        )}

        <div className="mt-6">
          <Button
            type="submit"
            disabled={isSubmitting}
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
