/* eslint-disable no-undef */
'use strict';

const searchForm = document.getElementById('searchForm');
const table = document.getElementById('table');
const editDialogDom = document.getElementById('editDialog');
const editDialogInst = new mdui.Dialog('#editDialog');
const idDom = document.querySelector('[name="id"]');
const nameDom = document.querySelector('[name="name"]');
const categoryDom = document.querySelector('[name="category"]');
const isRecommendDom = document.querySelector('[name="is_recommend"]');
const descriptionDom = document.querySelector('[name="description"]');
const dbInfoDom = document.querySelector('#db_info');
const tableBoxDom = document.getElementById('tableBox');
const editLinkDialogDom = document.getElementById('editLinkDialog');
const editLinkDialogInst = new mdui.Dialog('#editLinkDialog');
let currentLinkList,
  currentLinkList_i,
  currentLinkList_j;
const linkTxtDom = document.getElementById('linkTxt');
const linkSizeDom = document.getElementById('linkSize');
const linkEd2kDom = document.getElementById('linkEd2k');
const linkMagnetDom = document.getElementById('linkMagnet');
// const csrfTokenDom = document.querySelector('[name="_csrf"]');
const addBtn = document.getElementById('addBtn');

addBtn.onclick = function() {
  editDialogInst.open();
};

const categories = {
  2: '奇幻/科幻',
  3: '律政/医务',
  4: '情景/喜剧',
  5: '罪案/谍战',
  6: '历史/剧情',
  7: '动作/战争',
  8: '都市/情感',
  9: '灵异/惊悚',
  10: '动漫/卡通',
};

new GridManager(table, {
  gridManagerName: 'movies',
  width: '100%',
  height: '100%',
  supportAjaxPage: true,
  ajaxData: '/api/findallandcount',
  query: {
    name: '',
    category: 0,
  },
  columnData: [
    {
      key: 'id',
      text: 'id',
      width: '80px',
    },
    {
      key: 'name',
      text: '名称',
      width: '200px',
    },
    {
      key: 'category',
      text: '分类',
      width: '100px',
      template: category => {
        return categories[category];
      },
    },
    {
      key: 'description',
      text: '描述',
      templae: description => {
        return `<span class="ellipse">${description}</span>`;
      },
    },
    {
      key: 'action',
      remind: 'the action',
      width: '100px',
      align: 'center',
      // disableCustomize: true,
      text: '<span style="color: red">操作</span>',
      // 直接返回 通过函数返回
      template: (action, row) => {
        return `<a href="javascript: void(0);" data-id="${row.id}" onclick="editRowData(this)">修改</span>`;
      },
    },
  ],
});

searchForm.onsubmit = function() {
  const search_name = this.search_name.value;
  const search_category = this.search_category.value;
  GridManager.setQuery('movies', { name: search_name, category: search_category }, 1);
  return false;
};

// eslint-disable-next-line no-unused-vars
async function editRowData(dom) {
  const id = dom.dataset.id;
  const res = await axios.get(`/api/getmovie?id=${id}`);
  if (res.status === 200) {
    renderEditModal(res.data);
  }
  editDialogInst.open();
}

function renderEditModal(movie) {
  idDom.value = movie.id;
  nameDom.value = movie.name;
  categoryDom.value = movie.category;
  isRecommendDom.value = movie.is_recommend;
  descriptionDom.value = movie.description;
  dbInfoDom.innerHTML = movie.db_info;
  if (movie.link_list) {
    currentLinkList = JSON.parse(movie.link_list);
    setTable();
  }
}

function setTable() {
  tableBoxDom.innerHTML = '';
  const frag = document.createDocumentFragment();
  for (let i = 0; i < currentLinkList.length; i++) {
    const links = currentLinkList[i];
    const table = renderTable(links, i);
    frag.appendChild(table);
  }
  tableBoxDom.appendChild(frag);
}

function renderTable(links, i) {
  const tableBox = document.createElement('div');

  const addBtn = document.createElement('button');
  addBtn.type = 'button';
  addBtn.innerText = '添加';
  addBtn.className = 'mdui-btn mdui-btn-raised mdui-color-theme';
  addBtn.onclick = function() {
    editLink(i);
  };
  tableBox.appendChild(addBtn);

  const tmpTable = document.createElement('table');
  tmpTable.className = 'mdui-table';

  const tHead = `
  <thead>
    <tr>
      <th>名称</th>
      <th>大小</th>
      <th>ed2k</th>
      <th>magnet</th>
      <th>操作</th>
    </tr>
  </thead>`;

  const tbody = document.createElement('tbody');
  const frag = document.createDocumentFragment();
  for (let j = 0; j < links.length; j++) {
    const link = links[j];
    const tr = document.createElement('tr');
    const ed2k = link.ed2k ? '有' : '无';
    const magnet = link.magnet ? '有' : '无';
    tr.innerHTML = `
    <td>${link.txt}</td>
    <td>${link.size}</td>
    <td>${ed2k}</td>
    <td>${magnet}</td>
    <td><a href='javascript:void(0);' onclick="editLink(${i}, ${j})">修改</a></td>`;
    frag.appendChild(tr);
  }
  tbody.appendChild(frag);

  tmpTable.innerHTML += tHead;
  tmpTable.appendChild(tbody);

  tableBox.appendChild(tmpTable);
  return tableBox;
}

function editLink(i, j = -1) {
  currentLinkList_i = i;
  currentLinkList_j = j;
  editDialogInst.close();
  if (j >= 0) {
    const link = currentLinkList[i][j];
    linkTxtDom.value = link.txt;
    linkSizeDom.value = link.size;
    linkEd2kDom.value = link.ed2k;
    linkMagnetDom.value = link.magnet;
  }
  editLinkDialogInst.open();
}

editLinkDialogDom.onsubmit = function() {
  const newLink = {
    txt: this.txt.value,
    size: this.size.value,
    ed2k: this.ed2k.value,
    magnet: this.magnet.value,
  };
  if (this.txt.value) {
    if (currentLinkList_j >= 0) {
      currentLinkList[currentLinkList_i][currentLinkList_j] = newLink;
    } else {
      currentLinkList[currentLinkList_i].push(newLink);
    }
    setTable();
  }
  editLinkDialogInst.close();
  editDialogInst.open();
  this.reset();
  return false;
};

editDialogDom.addEventListener('cancel.mdui.dialog', function() {
  editDialogDom.reset();
  dbInfoDom.innerHTML = '';
  currentLinkList = [[]];
  setTable();
});

editDialogDom.addEventListener('confirm.mdui.dialog', async function() {
  const newMovie = {
    id: this.id.value,
    name: this.name.value,
    category: this.category.value,
    is_recommend: this.is_recommend.value,
    description: this.description.value,
    db_info: dbInfoDom.innerHTML,
  };
  newMovie.link_list = currentLinkList;
  const res = await axios({
    url: '/api/updatemovie',
    method: 'POST',
    data: newMovie,
    headers: {
      'x-csrf-token': this._csrf.value,
    },
  });
  console.log(res);
});
