'use client';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React, { ChangeEventHandler, InputHTMLAttributes, KeyboardEventHandler } from 'react';

const handleInputChangeEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
  console.log(event.target.value);
};

const handleInputKeyUpEvent = (event: React.KeyboardEvent<HTMLInputElement>) => {
  console.log(event.key);
};

export interface InputComponentProps {
  label: string;
  name?: string;
  type?: InputHTMLAttributes<HTMLInputElement>['type'];
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onKeyUp?: KeyboardEventHandler<HTMLInputElement>;
  placeholder?: string;
}

export const InputComponent = ({ name, label, placeholder }: InputComponentProps) => {
  return (
    <>
      <form>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor={label}>{label}</Label>
            <Input
              id={label}
              placeholder={placeholder}
              onChange={handleInputChangeEvent}
              onKeyUp={handleInputKeyUpEvent}
            />
          </div>
        </div>
      </form>
    </>
  );
};

InputComponent.propTypes = {};
