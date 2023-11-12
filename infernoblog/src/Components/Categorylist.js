import React from 'react';
import { Button, Box, Divider } from '@mui/material';
import { Link } from 'react-router-dom';

const categories = ['All', 'Coding News', 'Python', 'Sql', 'Javascript', 'Movies', 'Tv'];

const CategoryList = ({ onSelectCategory }) => {
  return (
    <>
      <Box display="flex" justifyContent="center" mt={2}>
        {categories.map((category) => (
          <Button
            key={category}
            component={Link}
            to={`/category/${category.toLowerCase()}`}
            onClick={() => onSelectCategory(category)}
            sx={{
              mx: 1,
              color: 'black',
              borderBottom: '5px solid transparent',
              transition: 'border-bottom 0.3s',
              '&:hover': {
                borderBottom: '5px solid red',
              },
            }}
          >
            {category}
          </Button>
        ))}
      </Box>
      <Divider
        variant="middle"
        sx={{
          backgroundImage:
          'linear-gradient(90deg, transparent, #000, transparent)',
          height: '1px',
          border: 'none',
          marginBlock: '10px',
        }}
      />
    </>
  );
};

export default CategoryList;
