function omitField<T extends object>(obj: T, fieldToRemove: keyof T): Omit<T, keyof T[typeof fieldToRemove]> {

    const { [ fieldToRemove ]: ignored, ...rest } = obj;

    return rest as Omit<T, keyof T[typeof fieldToRemove]>;

}

export default omitField;