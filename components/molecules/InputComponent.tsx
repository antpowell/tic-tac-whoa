'use client';
import React, { ChangeEventHandler, DOMAttributes, InputHTMLAttributes, KeyboardEventHandler } from 'react';
import { Label } from '@/components/atoms/label';
import { Input } from '@/components/atoms/input';

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
