import { useChancellery } from 'context/ChancelleryContext';
import React, { useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';

const EditProductForm = () => {
  const { currentGroup, setCurrentGroup } = useChancellery();
  const { register, control, setValue } = useForm({
    defaultValues: {
      amounts: currentGroup.amounts || '',
    },
  });
  const amounts = useWatch({ control, name: 'amounts' });

  useEffect(() => {
    setValue('amounts', currentGroup.amounts);
  }, [currentGroup, setValue]);

  useEffect(() => {
    setCurrentGroup((prev) => ({ ...prev, amounts }));
  }, [amounts, setCurrentGroup]);

  return (
    <form action="">
      <textarea readOnly value={currentGroup.name} className="main__input" />
      <label htmlFor="amounts"></label>
      <input
        type="number"
        id="amounts"
        className="main__input"
        {...register('amounts')}
      />
    </form>
  );
};

export default EditProductForm;
