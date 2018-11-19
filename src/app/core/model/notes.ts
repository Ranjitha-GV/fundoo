export interface Notes 
{
collaberator: [],
color: string,
createdDate: string,
description: string,
id: string,
imageUrl: string,
isArchived: false,
isDeleted: true,
isPined: false,
label: [],
linkUrl: string,
modifiedDate: string,
noteCheckLists: Array<Checklists>,
noteLabels: Array<Labels>,
questionAndAnswerNotes: [],
reminder: [Date],
title: string,
userId: string
}
export interface Labels
{
    id: string,
    isDeleted: false
    label: string,
    userId: string
}

export interface Checklists
{
    createdDate: string,
    id: string,
    isDeleted: false
    itemName: string,
    modifiedDate: string
    notesId: string,
    status: string
}
