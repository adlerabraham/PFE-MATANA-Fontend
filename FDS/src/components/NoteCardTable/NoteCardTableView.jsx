import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Table, Dropdown, Menu, notification, Popconfirm } from 'antd';
import './NoteCardTable.scss'
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { EllipsisOutlined, DownOutlined, PlusOutlined, EditOutlined, SaveOutlined } from '@ant-design/icons';
import {
  useGetTranscriptStatusQuery,
  useSubmitTransciptMutation, useValidateTranscriptMutation
} from '../../api/ApiEndpoints';
import TranscriptHeader from '../TranscriptHeader/TranscriptHeader';



const NoteCardTableView = (props) => {
  const [classID, levelID, group] = useOutletContext()
  const params = useParams()
  const noteCardID = JSON.parse(localStorage.getItem('noteCardID'))
  const noteData = JSON.parse(localStorage.getItem('noteCards'));
  const [dataSource, setDataSource] = useState(noteData);
  const navigate = useNavigate()
  const [subumitTranscript] = useSubmitTransciptMutation()
  const [validateTranscript] = useValidateTranscriptMutation()
  const noteCardStatus = {
    isIntraSaved: false,
    isFinaleSaved: false,
    isIntraSubmitted: false,
    isFinaleSubmitted: false,
    isIntraValidated: false,
    isFinaleValidated: false
  }

  if (group.toLowerCase() === 'teacher') {
    var createLink = "/teacherDashboard/" + classID + "/teacherclass/noteCards/" + levelID +
      "/noteCardTable/create"
    var updateLink = "/teacherDashboard/" + classID + "/teacherclass/noteCards/" + levelID +
      "/noteCardTable/update"

    if (localStorage.getItem('classTable') != null) {
      const classes = JSON.parse(localStorage.getItem('classTable'))
      var classIndex = classes.findIndex((item) =>
        item.id == params.classID
      )
      if (classIndex != -1) {
        var courseName = classes[classIndex].name
        var period = classes[classIndex].period.name
        var levels = classes[classIndex].levels
        var levelIndex = levels.findIndex((item) =>
          item.id == levelID
        )
        if (levelIndex != -1) {
          var level = levels[levelIndex].name
        } else {
          console.log("can't find level");
        }
      }
    }
  } else if (group.toLowerCase() === 'coordinator') {
    //var createLink = `/coordinatorDashboard/${params.programId}/${params.levelID}/${params.classID}/transcriptList/noteCardTable/create`
    var createLink = `../create`
    //var updateLink = `/coordinatorDashboard/${params.programId}/${params.levelID}/${params.classID}/transcriptList/noteCardTable/update`
    var updateLink = `../update`

    if (localStorage.getItem('classInfoTable') != null) {
      const classes = JSON.parse(localStorage.getItem('classInfoTable'))
      var classIndex = classes.findIndex((item) =>
        item.id == params.classID
      )
      if (classIndex != -1) {
        var courseName = classes[classIndex].name
        var period = classes[classIndex].period.name
        var level = params.levelID
      }
    }
  }

  const navigateToCreate = () => {
    navigate(createLink);
  };

  const navigateToUpdate = () => {
    navigate(updateLink);
  };

  const openSuccessfulSubmissionNotification = () => {
    notification.success({
      message: 'Soummisson réussie',
      description: 'Les notes ont été soumises avec succès.',
    });
  };

  const openUnsuccessfulSubmissionNotification = () => {
    notification.error({
      message: 'Soummisson échouée',
      description: "La soummission des notes a échoué.",
    });
  };


  const navigateToSubmitIntra = () => {
    // Logique pour le clic sur "Soumettre intra"
    const submissionResult = subumitTranscript({ transcriptID: noteCardID.intra }).unwrap()
    submissionResult.then((result) => {
      if (result.message) {
        openSuccessfulSubmissionNotification()
      } else {
        openUnsuccessfulSubmissionNotification()
      }
    })
  };

  const navigateToSubmitFinal = () => {
    // Logique pour le clic sur "Soumettre final"
    const submissionResult = subumitTranscript({ transcriptID: noteCardID.examen }).unwrap()
    submissionResult.then((result) => {
      if (result.message) {
        openSuccessfulSubmissionNotification()
      } else {
        openUnsuccessfulSubmissionNotification()
      }
    })
  };

  const cancel = () => {
    console.log('annule');
  }
  const openNotification = () => {
    notification.success({
      message: 'Validation réussie',
      description: 'Les notes ont été validées avec succès.',
    });
  };

  const openUnsuccessfulValidationNotification = () => {
    notification.error({
      message: 'Validation échoué',
      description: "La validation des notes a échoué.",
    });
  };

  const navigateToValidateIntra = () => {
    const validationResult = validateTranscript({ transcriptID: noteCardID.intra }).unwrap()
    //console.log(validationResult);
    validationResult.then((result) => {
      console.log(result.message);
      if (result.message) {
        openNotification()
      } else {
        openUnsuccessfulValidationNotification()
        localStorage.setItem('mismatchedID', JSON.stringify(result))
        navigate(`/coordinatorDashboard/${params.programId}/${params.levelID}/${params.classID}/transcriptList/noteCardTable/intra`)
      }
    })

  }

  const naviagteToValidateFinale = () => {
    const validationResult = validateTranscript({ transcriptID: noteCardID.examen }).unwrap()
    validationResult.then((result) => {
      console.log(result.message);
      if (result.message) {
        openNotification()
      } else {
        openUnsuccessfulValidationNotification()
        localStorage.setItem('mismatchedID', JSON.stringify(result))
        navigate(`/coordinatorDashboard/${params.programId}/${params.levelID}/${params.classID}/transcriptList/noteCardTable/finale`)
      }
    })
  }

  const { data: intraStatus, isLoading: isLoadingI, isError: isErrorI } = useGetTranscriptStatusQuery({ transcriptID: noteCardID.intra })
  if (!(isErrorI || isLoadingI)) {
    noteCardStatus.isIntraSaved = intraStatus.is_saved
    noteCardStatus.isIntraSubmitted = intraStatus.is_submitted
    noteCardStatus.isIntraValidated = intraStatus.is_validated

    localStorage.setItem("noteCardStatus", JSON.stringify(noteCardStatus))

    if (group.toLowerCase() === 'teacher') {
      var submitMenu = (
        <Menu>
          <Menu.Item key="create" onClick={navigateToCreate}>
            <PlusOutlined /> Ajouter
          </Menu.Item>
          <Menu.Item key="edit" onClick={navigateToUpdate}>
            <EditOutlined /> Modifier
          </Menu.Item>
          <Menu.SubMenu key="submit" title={<span><SaveOutlined /> Soumettre</span>}>
            {!noteCardStatus.isIntraSubmitted && noteCardStatus.isIntraSaved ?
              <Menu.Item key="submitIntra" >
                {/* Soumettre Partiel */}
                <Popconfirm
                  title="Confirmer Soumission"
                  description="Voullez vous effectuer cette soumission?"
                  onConfirm={navigateToSubmitIntra}
                  onCancel={cancel}
                  okText="OUI"
                  cancelText="NON">
                  Soumettre Partiel
                </Popconfirm>
              </Menu.Item>
              :
              <Menu.Item key="submitIntra" onClick={navigateToSubmitIntra} disabled>
                Soumettre Partiel
              </Menu.Item>
            }
          </Menu.SubMenu>
        </Menu>
      );
    } else if (group.toLowerCase() === 'coordinator') {
      var submitMenu = (
        <Menu>
          {noteCardStatus.isIntraSubmitted ?
            <Menu.Item key="create" onClick={navigateToCreate}>
              <PlusOutlined /> Ajouter
            </Menu.Item>
            :
            <Menu.Item key="create" onClick={navigateToCreate} disabled>
              <PlusOutlined /> Ajouter
            </Menu.Item>
          }
          {noteCardStatus.isIntraSubmitted ?
            <Menu.Item key="edit" onClick={navigateToUpdate}>
              <EditOutlined /> Modifier
            </Menu.Item>
            :
            <Menu.Item key="edit" onClick={navigateToUpdate} disabled>
              <EditOutlined /> Modifier
            </Menu.Item>
          }
          <Menu.SubMenu key="submit" title={<span><SaveOutlined /> Valider</span>}>
            {!noteCardStatus.isIntraValidated && noteCardStatus.isIntraSubmitted ?
              <Menu.Item key="submitIntra" >
                {/* Valider Partiel */}
                <Popconfirm
                  title="Confirmer Soumission"
                  description="Voullez vous effectuer cette soumission?"
                  onConfirm={navigateToValidateIntra}
                  onCancel={cancel}
                  okText="OUI"
                  cancelText="NON">
                  Valider Partiel
                </Popconfirm>
              </Menu.Item>
              :
              <Menu.Item key="submitIntra" onClick={navigateToValidateIntra} disabled>
                Valider Partiel
              </Menu.Item>
            }
          </Menu.SubMenu>
        </Menu>
      );
    }
  }

  const { data: finaleStatus, isLoading: isLoadingF, isError: isErrorF } = useGetTranscriptStatusQuery({ transcriptID: noteCardID.examen })


  if (!(isErrorF || isErrorI || isLoadingF || isLoadingI)) {
    //set intra transcript status
    // noteCardStatus.isIntraSaved = intraStatus.is_saved
    // noteCardStatus.isIntraSubmitted = intraStatus.is_submitted
    // noteCardStatus.isIntraValidated = intraStatus.is_validated

    //Set finale transcript status
    noteCardStatus.isFinaleSaved = finaleStatus.is_saved
    noteCardStatus.isFinaleSubmitted = finaleStatus.is_submitted
    noteCardStatus.isFinaleValidated = finaleStatus.is_validated

    localStorage.setItem("noteCardStatus", JSON.stringify(noteCardStatus))

    if (group.toLowerCase() === 'teacher') {
      var submitMenu = (
        <Menu>
          <Menu.Item key="create" onClick={navigateToCreate}>
            <PlusOutlined /> Ajouter
          </Menu.Item>
          <Menu.Item key="edit" onClick={navigateToUpdate}>
            <EditOutlined /> Modifier
          </Menu.Item>
          <Menu.SubMenu key="submit" title={<span><SaveOutlined /> Soumettre</span>}>
            {!noteCardStatus.isIntraSubmitted && noteCardStatus.isIntraSaved ?
              <Menu.Item key="submitIntra">
                {/* Soumettre Partiel */}
                <Popconfirm
                  title="Confirmer Soumission"
                  description="Voullez vous effectuer cette soumission?"
                  onConfirm={navigateToSubmitIntra}
                  onCancel={cancel}
                  okText="OUI"
                  cancelText="NON">
                  Soumettre Partiel
                </Popconfirm>
              </Menu.Item>
              :
              <Menu.Item key="submitIntra" onClick={navigateToSubmitIntra} disabled>
                Soumettre Partiel
              </Menu.Item>
            }
            {!noteCardStatus.isFinaleSubmitted && noteCardStatus.isFinaleSaved ?

              <Menu.Item key="submitFinal" >
                {/* Soumettre Final */}
                <Popconfirm
                  title="Confirmer Soumission"
                  description="Voullez vous effectuer cette soumission?"
                  onConfirm={navigateToSubmitFinal}
                  onCancel={cancel}
                  okText="OUI"
                  cancelText="NON">
                  Soumettre Partiel
                </Popconfirm>
              </Menu.Item>
              :
              <Menu.Item key="submitFinal" onClick={navigateToSubmitFinal} disabled>
                Soumettre Final
              </Menu.Item>
            }

          </Menu.SubMenu>
        </Menu>
      );
    } else if (group.toLowerCase() === 'coordinator') {
      var submitMenu = (
        <Menu>
          {noteCardStatus.isIntraSubmitted || noteCardStatus.isFinaleSubmitted ?
            <Menu.Item key="create" onClick={navigateToCreate}>
              <PlusOutlined /> Ajouter
            </Menu.Item>
            :
            <Menu.Item key="create" onClick={navigateToCreate} disabled>
              <PlusOutlined /> Ajouter
            </Menu.Item>
          }
          {noteCardStatus.isIntraSubmitted || noteCardStatus.isFinaleSubmitted ?
            <Menu.Item key="edit" onClick={navigateToUpdate}>
              <EditOutlined /> Modifier
            </Menu.Item>
            :
            <Menu.Item key="edit" onClick={navigateToUpdate} disabled>
              <EditOutlined /> Modifier
            </Menu.Item>
          }
          <Menu.SubMenu key="submit" title={<span><SaveOutlined /> Valider</span>}>
            {!noteCardStatus.isIntraValidated && noteCardStatus.isIntraSubmitted ?
              <Menu.Item key="submitIntra">
                <Popconfirm
                  title="Confirmer Validation"
                  description="Voullez vous effectuer cette validation?"
                  onConfirm={navigateToValidateIntra}
                  onCancel={cancel}
                  okText="OUI"
                  cancelText="NON">
                  Valider Partiel
                </Popconfirm>
              </Menu.Item>
              :
              <Menu.Item key="submitIntra" onClick={navigateToValidateIntra} disabled>
                Valider Partiel
              </Menu.Item>
            }
            {!noteCardStatus.isFinaleValidated && noteCardStatus.isFinaleSubmitted ?
              <Menu.Item key="submitFinal" >
                <Popconfirm
                  title="Confirmer Validation"
                  description="Voullez vous effectuer cette validation?"
                  onConfirm={naviagteToValidateFinale}
                  onCancel={cancel}
                  okText="OUI"
                  cancelText="NON">
                  Valider Final
                </Popconfirm>
              </Menu.Item>
              :
              <Menu.Item key="submitFinal" onClick={naviagteToValidateFinale} disabled>
                Valider Final
              </Menu.Item>
            }
          </Menu.SubMenu>
        </Menu>
      );
    }
  }

  const defaultColumns = [
    {
      title: 'Code',
      dataIndex: 'code',
      className: 'code',
    },
    {
      title: 'Prénom',
      dataIndex: 'prenom',
      className: 'prenom',
    },
    {
      title: 'Nom',
      dataIndex: 'nom',
      className: 'nom',
    },
    {
      title: 'Partiel',
      dataIndex: 'intra',
      editable: false,
      className: 'partiel',
    },
    {
      title: 'Final',
      dataIndex: 'examen',
      editable: false,
      className: 'final',
    },
  ];

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 40, // Set the desired page size here
  });

  const handleTableChange = (pagination) => {
    setPagination(pagination);
  };

  return (
    <div>
      <Dropdown overlay={submitMenu} trigger={['click']}>
        <Button className="custom-button">
          <span className="custom-button-text">Options</span>
          <EllipsisOutlined />
        </Button>
      </Dropdown>
      <TranscriptHeader
        courseName={courseName}
        level={level}
        period={period}
      />
      <Table
        bordered
        dataSource={dataSource}
        pagination={pagination}
        onChange={handleTableChange}
        columns={defaultColumns}
        locale={{
          emptyText: 'Pas de données disponibles', // Personnalisez le message ici
        }}
      />
    </div>
  );
};
export default NoteCardTableView;

// import React, { useState } from 'react';
// import { Button, Form, Input, Table, Dropdown, Menu } from 'antd';
// import './NoteCardTable.scss'
// import { useCreateGradesMutation } from '../../api/ApiEndpoints';
// import { useNavigate, useOutletContext } from 'react-router-dom';
// import { EllipsisOutlined, DownOutlined, PlusOutlined, EditOutlined } from '@ant-design/icons';



// const NoteCardTableView = (props) => {

//   const [classID, periodID, levelID] = useOutletContext()

//   const noteData = JSON.parse(localStorage.getItem('noteCards'));
//   const [dataSource, setDataSource] = useState(noteData);
//   const navigate = useNavigate()
//   const createLink = "/teacherDashboard/" + classID + "/teacherclass/noteCards/" + levelID +
//     "/noteCardTable/create"
//   const updateLink = "/teacherDashboard/" + classID + "/teacherclass/noteCards/" + levelID +
//     "/noteCardTable/update"

//   const defaultColumns = [
//     {
//       title: 'Code',
//       dataIndex: 'code',
//       className: 'code',
//     },
//     {
//       title: 'Prénom',
//       dataIndex: 'prenom',
//       className: 'prenom',
//     },
//     {
//       title: 'Nom',
//       dataIndex: 'nom',
//       className: 'nom',
//     },
//     {
//       title: 'Partiel',
//       dataIndex: 'intra',
//       editable: false,
//       className: 'partiel',
//     },
//     {
//       title: 'Final',
//       dataIndex: 'examen',
//       editable: false,
//       className: 'final',
//     },
//   ];


//   const navigateToCreate = () => {
//     navigate(createLink);
//   };

//   const navigateToUpdate = () => {
//     navigate(updateLink);
//   };

//   const menu = (
//     <Menu>
//       <Menu.Item key="create" onClick={navigateToCreate}>
//         <PlusOutlined /> Ajouter
//       </Menu.Item>
//       <Menu.Item key="edit" onClick={navigateToUpdate}>
//         <EditOutlined /> Modifier
//       </Menu.Item>
//     </Menu>
//   );

//   const [pagination, setPagination] = useState({
//     current: 1,
//     pageSize: 40, // Set the desired page size here
//   });

//   const handleTableChange = (pagination) => {
//     setPagination(pagination);
//   };

//   return (
//     <div>
//       {/* <Dropdown overlay={menu}>
//       <Button icon={<EllipsisOutlined />} className="custom-button" />
//       </Dropdown> */}
//       <Dropdown overlay={menu}>
//         <Button className="custom-button">
//           <span className="custom-button-text">Options</span>
//           <EllipsisOutlined />
//         </Button>
//       </Dropdown>
//       <Table
//         bordered
//         dataSource={dataSource}
//         pagination={pagination}
//         onChange={handleTableChange}
//         columns={defaultColumns}
//         locale={{
//           emptyText: 'Pas de données disponibles', // Personnalisez le message ici
//         }}
//       />
//     </div>
//   );
// };
// export default NoteCardTableView;
