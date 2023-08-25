import moment from 'moment';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import IconButton from '@mui/material/IconButton';
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import useCopyToClipboard from '@/hooks/useCopyToClipboard';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import { AlertDefault } from '@/components/Alert/AlertDefault';

type APIKeyTableProps = {
  apiKeyData: API.ProjectAPIKey[];
  setDialogOpen: (dialogOpen: boolean) => void;
  onClickOpenDeleteAPIKeyDialog: (id: string) => void;
  onClickOpenUpdateAPIKeyDialog: (
    id: string,
    value: string | undefined
  ) => void;
};

function APIKeyTable(props: APIKeyTableProps) {
  const {
    apiKeyData,
    setDialogOpen,
    onClickOpenDeleteAPIKeyDialog,
    onClickOpenUpdateAPIKeyDialog,
  } = props;
  const [copyToClipboard, { success }] = useCopyToClipboard();

  const [visibleKeys, setVisibleKeys] = useState<string[]>([]);

  const toggleVisibility = (apiKeyId: string) => {
    if (visibleKeys.includes(apiKeyId)) {
      setVisibleKeys((prev) => prev.filter((id) => id !== apiKeyId));
    } else {
      setVisibleKeys((prev) => [...prev, apiKeyId]);
    }
  };

  return (
    <>
      {success ? (
        <AlertDefault description="API Key copied to clipboard!" />
      ) : null}
      <div className="mt-8 flow-root">
        <div className="-my-2 overflow-x-auto">
          <div className="inline-block min-w-full py-2 align-middle">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8"
                  >
                    NAME
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    KEY
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Type
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Create Time
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Update Time
                  </th>
                  <th
                    scope="col"
                    className="relative py-3.5 pl-3 pr-4 sm:pr-6 lg:pr-8"
                  >
                    <span className="sr-only">Revoke</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {apiKeyData.map((apiKey) => (
                  <tr key={apiKey._id}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">
                      {apiKey.name}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1 ">
                        <div>
                          {visibleKeys.includes(apiKey._id as string)
                            ? apiKey.api_key
                            : `**********${apiKey.api_key.slice(-5)}`}
                        </div>

                        <IconButton
                          aria-label="visibility eye"
                          size="small"
                          onClick={() => toggleVisibility(apiKey._id as string)}
                        >
                          {visibleKeys.includes(apiKey._id as string) ? (
                            <VisibilityOffRoundedIcon
                              sx={{ width: 16, height: 16 }}
                            />
                          ) : (
                            <VisibilityRoundedIcon
                              sx={{ width: 16, height: 16 }}
                            />
                          )}
                        </IconButton>
                        <IconButton
                          aria-label="visibility eye"
                          size="small"
                          onClick={() => copyToClipboard(apiKey.api_key)}
                        >
                          <ContentCopyRoundedIcon
                            sx={{ width: 16, height: 16 }}
                          />
                        </IconButton>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {apiKey.type}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {moment(apiKey.create_time).format('YYYY-MM-DD')}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {moment(apiKey.update_time).format('YYYY-MM-DD')}
                    </td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 lg:pr-8">
                      <Button
                        variant="ghost"
                        className="p-2"
                        onClick={() =>
                          onClickOpenUpdateAPIKeyDialog(
                            apiKey._id || '',
                            apiKey.name
                          )
                        }
                      >
                        <CreateOutlinedIcon sx={{ width: 18 }} />
                      </Button>
                      <Button
                        variant="ghost"
                        className="p-2"
                        onClick={() =>
                          onClickOpenDeleteAPIKeyDialog(apiKey._id || '')
                        }
                      >
                        <DeleteOutlineOutlinedIcon sx={{ width: 20 }} />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default APIKeyTable;
