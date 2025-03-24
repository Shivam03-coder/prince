"use client";

import { CheckCircle, XCircle } from "lucide-react";
import { useToast } from "./use-toast";

interface ToastProps {
  title: string;
  description?: string;
}

export const useAppToasts = () => {
  const { toast } = useToast();

  const SuccessToast = ({ title, description }: ToastProps) => {
    toast({
      description: (
        <div className="flex items-start gap-3">
          <CheckCircle className="mt-1 size-6 text-green-600" />

          <div>
            <span className="font-lexend text-base font-normal text-green-800">
              {title}
            </span>
            {description && (
              <p className="text-sm text-green-700">{description}</p>
            )}
          </div>
        </div>
      ),
      className:
        "bg-green-100 text-green-900 border border-green-300 shadow-md",
    });
  };

  const ErrorToast = ({ title, description }: ToastProps) => {
    toast({
      description: (
        <div className="flex items-start gap-3">
          <XCircle className="mt-1 size-6 text-red-600" />
          <div>
            <span className="font-lexend text-base font-normal text-green-800">
              {title}
            </span>
            {description && (
              <p className="text-sm text-red-700">{description}</p>
            )}
          </div>
        </div>
      ),
      className: "bg-red-100 text-red-900 border border-red-300 shadow-md",
    });
  };

  return { SuccessToast, ErrorToast };
};