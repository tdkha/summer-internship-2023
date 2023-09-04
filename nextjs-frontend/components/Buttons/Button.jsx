'use client'
import React, { useEffect } from 'react';

export default function SubmitButton({ handler, text, TextSize, size , BorderColor, HoverBorderColor,BackGroundColor , HoverBackGroundColor, TextColor, HoverTextColor,id }) {
  useEffect(() => {
    const Button = document.querySelector(`#${id}`);
    if (BorderColor !== undefined) Button.style.borderColor = BorderColor;
    if (BackGroundColor !== undefined) Button.style.backgroundColor = BackGroundColor;
    if (TextColor !== undefined) Button.style.color = TextColor;
    if(TextSize !== undefined) {
      if(TextSize == 'xs'){
        Button.style.fontSize ='0.75rem';
        Button.style.lineHeight ='1rem';
      }else if (TextSize == 'sm'){
        Button.style.fontSize ='0.875rem';
        Button.style.lineHeight ='1.25rem';
      }else if (TextSize == 'lg'){
        Button.style.fontSize ='1.125rem';
        Button.style.lineHeight ='1.75rem';
      }else {
        Button.style.fontSize ='1rem';
        Button.style.lineHeight ='1.5rem';
      }
    }
    // if(size !== undefined){
    //   if(size == 'sm'){
    //     Button.style.paddingLeft = '1.5rem';
    //     Button.style.paddingRight = '1.5rem';
    //     Button.style.paddingTop = '0.25rem';
    //     Button.style.paddingBottom = '0.25rem';
    //   } else if(size == 'md'){
    //     Button.style.paddingLeft = '2rem';
    //     Button.style.paddingRight = '2rem';
    //     Button.style.paddingTop = '0.75rem';
    //     Button.style.paddingBottom = '0.75rem';
    //   }
    //   else if(size == 'lg'){
    //     Button.style.paddingLeft = '2.5rem';
    //     Button.style.paddingRight = '2.5rem';
    //     Button.style.paddingTop = '1.25rem';
    //     Button.style.paddingBottom = '1.25rem';
    //   }
    // }
    const handleMouseEnter = () => {
      if (HoverBorderColor !== undefined) Button.style.borderColor = HoverBorderColor;
      if (HoverBackGroundColor !== undefined) Button.style.backgroundColor = HoverBackGroundColor;
      if (HoverTextColor !== undefined) Button.style.color = HoverTextColor;
    };

    const handleMouseLeave = () => {
      if (BorderColor !== undefined) Button.style.borderColor = BorderColor;
      if (BackGroundColor !== undefined) Button.style.backgroundColor = BackGroundColor;
      if (TextColor !== undefined) Button.style.color = TextColor;
    };

    Button.addEventListener('mouseenter', handleMouseEnter);
    Button.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      Button.removeEventListener('mouseenter', handleMouseEnter);
      Button.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [BorderColor, BackGroundColor, HoverBackGroundColor, TextColor, HoverTextColor]);

  return (
    <button
      id={id}
      onClick={handler}
      className={`border-[black] border-2 px-6 py-1 rounded-full font-Inter`}
    >
      {text}
    </button>
  );
}
