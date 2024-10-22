
import React, { useReducer } from 'react';

const initialState = {
    students: [
        { id: 1, fname: "Jeeva", age: 20, language: "Tamil", phoneNumber: "9897735209", dob: "07-06-2004", state: "Tamil Nadu" },
        { id: 2, fname: "Hari", age: 50, language: "Malayalam", phoneNumber: "7309765433", dob: "28-10-2002", state: "Kerala" },
        { id: 3, fname: "Mani", age: 36, language: "Telugu", phoneNumber: "8870128610", dob: "23-11-2001", state: "Bengaluru" },
        { id: 4, fname: "Manoj", age: 28, language: "Hindi", phoneNumber: "7765328765", dob: "17-04-2004", state: "Delhi" },
        { id: 5, fname: "Abu", age: 57, language: "Kannada", phoneNumber: "8765432193", dob: "01-01-2000", state: "Andhra Pradesh" }
    ],
    searchTerm: '',
    filteredStudents: [],
    newStudent: {
        fname: '',
        age: '',
        language: '',
        phoneNumber: '',
        dob: '',
        state: '',
    },
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_SEARCH_TERM':
            return { ...state, searchTerm: action.payload };
        case 'FILTER_STUDENTS':
            const filteredStudents = state.students.filter(student =>
                student.fname.toLowerCase().includes(state.searchTerm.toLowerCase())
            );
            return { ...state, filteredStudents };
        case 'RESET_STUDENTS':
            return { ...state, filteredStudents: [] };
        case 'INSERT_DATA':
            const newId = state.students.length ? Math.max(state.students.map(s => s.id)) + 1 : 1;
            return { ...state, students: [...state.students, { ...state.newStudent, id: newId }], newStudent: initialState.newStudent };
        case 'DELETE_DATA':
            return { ...state, students: state.students.filter(student => student.id !== action.payload) };
        case 'SORT_ASC':
            return { ...state, students: [...state.students].sort((a, b) => a.fname.localeCompare(b.fname)) };
        case 'SORT_DESC':
            return { ...state, students: [...state.students].sort((a, b) => b.fname.localeCompare(a.fname)) };
        case 'LOWERCASE':
            return {
                ...state,
                students: state.students.map(student => ({
                    ...student,
                    fname: student.fname.toLowerCase(),
                    state: student.state.toLowerCase(),
                    language: student.language.toLowerCase(),
                })),
            };
        case 'UPPERCASE':
            return {
                ...state,
                students: state.students.map(student => ({
                    ...student,
                    fname: student.fname.toUpperCase(),
                    state: student.state.toUpperCase(),
                    language: student.language.toUpperCase(),
                })),
            };
        case 'UPDATE_NEW_STUDENT':
            return { ...state, newStudent: { ...state.newStudent, [action.field]: action.value } };
        default:
            return state;
    }
};

function TableDatas() {
    const [state, dispatch] = useReducer(reducer, initialState);

    const handleSearch = () => {
        dispatch({ type: 'FILTER_STUDENTS' });
    };

    const handleReset = () => {
        dispatch({ type: 'RESET_STUDENTS' });
    };

    const handleInsert = () => {
        dispatch({ type: 'INSERT_DATA' });
    };

    const handleDelete = (id) => {
        dispatch({ type: 'DELETE_DATA', payload: id });
    };

    const handleFieldChange = (field, value) => {
        dispatch({ type: 'UPDATE_NEW_STUDENT', field, value });
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Search by name..."
                value={state.searchTerm}
                onChange={(e) => dispatch({ type: 'SET_SEARCH_TERM', payload: e.target.value })}
            />
            <button onClick={handleSearch}>Search</button>
            <button onClick={handleReset}>Reset</button>

            <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '10px' }}>

                <input type="text"
                    placeholder="Name"
                    value={state.newStudent.fname}
                    onChange={(e) => handleFieldChange('fname', e.target.value)} />

                <input type="number"
                    placeholder="Age"
                    value={state.newStudent.age}
                    onChange={(e) => handleFieldChange('age', e.target.value)} />

                <input type="text"
                    placeholder="Language"
                    value={state.newStudent.language}
                    onChange={(e) => handleFieldChange('language', e.target.value)} />

                <input type="text"
                    placeholder="Phone Number"
                    value={state.newStudent.phoneNumber}
                    onChange={(e) => handleFieldChange('phoneNumber', e.target.value)} />

                <input type="text"
                    placeholder="DOB"
                    value={state.newStudent.dob}
                    onChange={(e) => handleFieldChange('dob', e.target.value)} />

                <input type="text"
                    placeholder="State"
                    value={state.newStudent.state}
                    onChange={(e) => handleFieldChange('state', e.target.value)} />

                <button onClick={handleInsert}>Insert</button>
            </div>
            <div>
                <button onClick={() => dispatch({ type: 'SORT_ASC' })}>Sort A-Z</button>
                <button onClick={() => dispatch({ type: 'SORT_DESC' })}>Sort Z-A</button>
                <button onClick={() => dispatch({ type: 'LOWERCASE' })}>Lowercase</button>
                <button onClick={() => dispatch({ type: 'UPPERCASE' })}>Uppercase</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Language</th>
                        <th>Phone Number</th>
                        <th>DOB</th>
                        <th>State</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {(state.filteredStudents.length > 0 ? state.filteredStudents : state.students).map(student => (
                        <tr key={student.id}>
                            <td>{student.fname}</td>
                            <td>{student.age}</td>
                            <td>{student.language}</td>
                            <td>{student.phoneNumber}</td>
                            <td>{student.dob}</td>
                            <td>{student.state}</td>
                            <td>
                                <button onClick={() => handleDelete(student.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TableDatas;
