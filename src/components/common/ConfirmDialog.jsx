import { useState } from "react";
import { motion } from "framer-motion";

const ConfirmDialog = ({
  title = "Konfirmasi",
  message = "Apakah Anda yakin?",
  confirmText = "Ya",
  cancelText = "Batal",
  onConfirm,
  onCancel,
  trigger, // elemen yang dipakai untuk membuka dialog
}) => {
  const [open, setOpen] = useState(false);

  const handleConfirm = () => {
    if (onConfirm) onConfirm();
    setOpen(false);
  };

  const handleCancel = () => {
    if (onCancel) onCancel();
    setOpen(false);
  };

  return (
    <>
      <div onClick={() => setOpen(true)} className="inline-block">
        {trigger}
      </div>

      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.2 } }}
          exit={{ opacity: 0, transition: { duration: 0.2 } }}
          className="fixed inset-0 z-40 flex items-center justify-center bg-black/40"
        >
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
            {/* Header */}
            <h2 className="text-lg font-semibold mb-2">{title}</h2>
            <p className="text-sm text-gray-600 mb-6">{message}</p>

            {/* Footer */}
            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 text-sm rounded-md border border-gray-300 hover:bg-gray-100"
                onClick={handleCancel}
              >
                {cancelText}
              </button>
              <button
                className="px-4 py-2 text-sm rounded-md bg-red-600 text-white hover:bg-red-700"
                onClick={handleConfirm}
              >
                {confirmText}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default ConfirmDialog;
