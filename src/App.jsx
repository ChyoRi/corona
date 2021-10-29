import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Styled from 'styled-components';

const App = () => {
  const url = 'https://youngchul-57854-default-rtdb.firebaseio.com/corona.json';
  const titles = [ 'NO', '지역', '접촉력', '확진일', '노출여부', '연번', '등록일', '상태', '수정일', '여행력' ];
  const props = [
    'corona19_area', 'corona19_contact_history', 'corona19_date', 'corona19_display_yn',
    'corona19_id', 'corona19_idate', 'corona19_leave_status', 'corona19_mdate', 'corona19_travel_history'
  ];
  const [ list, setList ] = useState(null);
  const [ value, setValue ] = useState('');
  const [ load, setLoad ] = useState(true);

  useEffect(() => {
    fetch(url).then((res) => res.json()).then(({DATA}) => {
      setList(DATA);
      setLoad(false);
    });
  }, []);

  const changeValue = useCallback((e) => {
    setValue(e.target.value) 
  },[setValue]);

  const titleMemo = useMemo(() => (
    titles.map(title => <th key={title}>{ title }</th>)
  ));

  const listMemo = useMemo(()=> (
    list?.map((li, i) => {
      let tag = <tr key={i}><td>{ i + 1 }</td>{props?.map((prop, ii) => <td key={ii}>{ prop == 'corona19_idate' || prop == 'corona19_mdate' ? li[prop].split(' ')[0] : li[prop] == '노원구' ? <span>{li[prop]}</span>: li[prop]}</td>)}</tr>;
      let bool = li.corona19_area.search(value) > -1 ? true : false;
      if (bool) return tag;
    })
  ),[list,value]);

  useEffect(() => console.log('list가 변경되었습니다.'), [list]);

  return (
    <main>
      <Input onChange={ changeValue } placeholder="검색어를 입력하세요."/>
      <small>총 확진자 수: { list?.length ?? 0 }명</small>
      <Table>
        <thead>
          <tr>
            { titleMemo }
          </tr>
        </thead>
        <tbody>
          { load ? <tr><td colSpan={titles.length}>로딩중..</td></tr> : listMemo }
        </tbody>
      </Table>
    </main>
  );
}

export default App;

const Table = Styled.table`
  border-collapse : collapse;
  width: 100%;
  
  th,td {
    border: 1px solid #aaa;
    padding: 4px 14px;
    text-align: center;

    span {
      color: red;
    }
  }
`;

const Input = Styled.input`
  width: 100%;
  height: 30px;
  border: 1px solid #aaa;
  padding: 0 6px;
`;