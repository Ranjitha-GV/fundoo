export interface Notes 
{
collaberator: [],
color: string,
createdDate: string,
description: string,
id: string,
imageUrl: string,
isArchived: boolean,
isDeleted: boolean,
isPined: boolean,
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
    isDeleted: boolean
    label: string,
    userId: string
}

export interface Checklists
{
    createdDate: string,
    id: string,
    isDeleted: boolean,
    itemName: string,
    modifiedDate: string
    notesId: string,
    status: string
}
