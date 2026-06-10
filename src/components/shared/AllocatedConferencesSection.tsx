import { useMemo, useState } from 'react';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import SearchIcon from '@mui/icons-material/Search';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import type { Control, FieldErrors } from 'react-hook-form';
import { Controller, useFieldArray } from 'react-hook-form';
import { MOCK_CONFERENCES } from '../../services/mocks/conferenceMockData';
import type { ConferenceAllocation } from '../../types/conferenceAllocationSchema';
import type { ConferenceRowData } from '../../types/conference';
import {
  conferenceRowToAllocation,
  filterAvailableConferences,
} from '../../utils/conferenceAllocationLogic';
import { TEXT_FIELD_WIDTH } from '../../theme/createKerenOrTheme';
import { rtlTextSx } from '../../theme/rtlLayout';
import { popupSearchActionRowSx } from './dialogLayout';
import {
  popupTableContainerSx,
  popupTableEmptyCellSx,
  tableBodyCellSx,
  tableCellContentSx,
  tableHeadCellSx,
} from '../table/tableStyles';

type ConferencesFormSlice = {
  conferences: ConferenceAllocation[];
};

interface AllocatedConferencesSectionProps {
  control: Control<ConferencesFormSlice>;
  errors: FieldErrors<ConferencesFormSlice>;
  sectionTitle: (count: number) => string;
  conflictsColumnLabel: string;
}

const COLUMNS = [
  { id: 'number', label: 'מספר', width: '14%' },
  { id: 'code', label: 'קוד', width: '12%' },
  { id: 'purpose', label: 'ייעוד (מוניטין)', width: '22%' },
  { id: 'actualPurpose', label: 'ייעוד בפועל', width: '22%' },
  { id: 'conflicts', label: '', width: '18%' },
  { id: 'actions', label: '', width: '12%' },
] as const;

export function AllocatedConferencesSection({
  control,
  errors,
  sectionTitle,
  conflictsColumnLabel,
}: AllocatedConferencesSectionProps) {
  const { fields, append, remove } = useFieldArray({ control, name: 'conferences' });
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOption, setSelectedOption] = useState<ConferenceRowData | null>(null);

  const selectedIds = useMemo(() => new Set(fields.map((field) => field.id)), [fields]);

  const options = useMemo(
    () => filterAvailableConferences(MOCK_CONFERENCES, searchQuery, selectedIds),
    [searchQuery, selectedIds],
  );

  const handleAdd = () => {
    if (!selectedOption) {
      return;
    }
    append(conferenceRowToAllocation(selectedOption));
    setSelectedOption(null);
    setSearchQuery('');
  };

  return (
    <Box sx={{ width: '100%', ...rtlTextSx }}>
      <Typography variant="h5" component="h3" sx={{ mb: 2, ...rtlTextSx }}>
        {sectionTitle(fields.length)}
      </Typography>

      <Box sx={popupSearchActionRowSx}>
        <Button variant="contained" onClick={handleAdd} disabled={!selectedOption} sx={{ flexShrink: 0 }}>
          הוסף
        </Button>
        <Autocomplete
          sx={{ width: TEXT_FIELD_WIDTH, flexShrink: 0 }}
          popupIcon={null}
          options={options}
          value={selectedOption}
          onChange={(_, value) => setSelectedOption(value)}
          inputValue={searchQuery}
          onInputChange={(_, value) => setSearchQuery(value)}
          getOptionLabel={(option) => option.number}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          noOptionsText="לא נמצאו ועידות"
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="חפש לפי מספר או ייעוד..."
              slotProps={{
                ...params.slotProps,
                input: {
                  ...params.slotProps.input,
                  sx: rtlTextSx,
                  startAdornment: (
                    <>
                      <SearchIcon fontSize="small" color="action" sx={{ ml: 0.5 }} />
                      {params.slotProps.input.startAdornment}
                    </>
                  ),
                },
              }}
            />
          )}
          renderOption={(props, option) => (
            <li {...props} key={option.id}>
              <Box sx={{ ...rtlTextSx, width: '100%' }}>
                <Typography variant="body2">{option.number}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {option.purpose}
                </Typography>
              </Box>
            </li>
          )}
        />
      </Box>

      {errors.conferences?.message ? (
        <Typography variant="caption" color="error" sx={{ display: 'block', mb: 1, ...rtlTextSx }}>
          {errors.conferences.message}
        </Typography>
      ) : null}

      <TableContainer sx={popupTableContainerSx}>
        <Table sx={{ tableLayout: 'fixed', width: '100%' }}>
          <TableHead>
            <TableRow>
              {COLUMNS.map(({ id, label, width }) => (
                <TableCell key={id} align="right" sx={{ ...tableHeadCellSx, width }}>
                  {id === 'conflicts' ? conflictsColumnLabel : label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {fields.length === 0 ? (
              <TableRow>
                <TableCell colSpan={COLUMNS.length} sx={popupTableEmptyCellSx}>
                  <Typography
                    variant="body2"
                    sx={{
                      py: 2,
                      textAlign: 'center /* @noflip */',
                      width: '100%',
                      opacity: 0.5,
                    }}
                  >
                    לא נבחרו ועידות. חובה לבחור לפחות ועידה אחת.
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              fields.map((field, index) => (
                <TableRow key={field.id}>
                  <TableCell align="right" sx={tableBodyCellSx}>
                    <Typography variant="body2" sx={tableCellContentSx}>
                      {field.number}
                    </Typography>
                  </TableCell>
                  <TableCell align="right" sx={tableBodyCellSx}>
                    <Typography variant="body2" sx={tableCellContentSx}>
                      {field.code}
                    </Typography>
                  </TableCell>
                  <TableCell align="right" sx={tableBodyCellSx}>
                    <Typography variant="body2" sx={tableCellContentSx}>
                      {field.purpose}
                    </Typography>
                  </TableCell>
                  <TableCell align="right" sx={tableBodyCellSx}>
                    <Controller
                      control={control}
                      name={`conferences.${index}.actualPurpose`}
                      render={({ field: actualPurposeField }) => (
                        <TextField
                          {...actualPurposeField}
                          size="small"
                          fullWidth
                          variant="standard"
                          slotProps={{ input: { sx: rtlTextSx } }}
                        />
                      )}
                    />
                  </TableCell>
                  <TableCell align="right" sx={tableBodyCellSx}>
                    <Typography variant="body2" sx={tableCellContentSx}>
                      {field.conflicts}
                    </Typography>
                  </TableCell>
                  <TableCell align="center" sx={tableBodyCellSx}>
                    <IconButton
                      aria-label="הסרת ועידה"
                      size="small"
                      color="inherit"
                      onClick={() => remove(index)}
                    >
                      <DeleteOutlineIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
